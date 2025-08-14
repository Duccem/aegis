import { NextRequest, NextResponse } from "next/server";
import { ZodError, ZodSchema } from "zod";
import {
  BetterMember,
  BetterOrganization,
  BetterUser,
  getMember,
  getOrganization,
  getSession,
  hasPermission,
} from "../auth/server";
import { DomainError } from "../types/domain-error";
import { FormatError } from "../types/errors/format-error";
import { Unauthenticated } from "../types/errors/unauthenticated";
import { Unauthorized } from "../types/errors/unauthorized";
import { HttpNextResponse } from "./http-response";

type RouteHandlerParams<Q, P, R, Authenticated extends boolean | undefined> = {
  req: NextRequest;
  params: R;
  searchParams: Q;
  body: P;
} & (Authenticated extends false
  ? {}
  : { user: BetterUser; organization: BetterOrganization; member: BetterMember });

type RouteHandler<Q, P, R, Authenticated extends boolean | undefined> = (
  params: RouteHandlerParams<Q, P, R, Authenticated>,
) => Promise<NextResponse>;

type RouteHandlerOptions<Q, P, R, Authenticated extends boolean | undefined> = {
  name: string;
  schema?: ZodSchema<P>;
  querySchema?: ZodSchema<Q>;
  paramsSchema?: ZodSchema<R>;
  authenticated?: Authenticated;
} & (Authenticated extends false
  ? { permissions?: undefined }
  : { permissions?: { [key: string]: string[] } });

export const routeHandler = <
  T extends DomainError,
  P,
  Q,
  R,
  Authenticated extends boolean | undefined = undefined,
>(
  options: RouteHandlerOptions<Q, P, R, Authenticated>,
  handler: RouteHandler<Q, P, R, Authenticated>,
  onError?: (error: T) => NextResponse,
) => {
  return async (req: NextRequest, { params }: { params: Promise<R> }) => {
    const { user, organization, member } = await authentication(options.authenticated);

    if (user && options.permissions) {
      await authorization(options.permissions);
    }

    const urlParams = await parseParams(params, options.paramsSchema);
    const searchParams = parseSeachParams<Q>(req, options.querySchema);
    const body = await parseBody<P>(req, options.schema);

    try {
      const handlerParams = {
        req,
        params: urlParams,
        searchParams,
        body,
        ...(organization && { organization }),
        ...(user && { user }),
        ...(member && { member }),
      };
      return handler(handlerParams as unknown as RouteHandlerParams<Q, P, R, Authenticated>);
    } catch (error) {
      console.error(error);
      switch (true) {
        case error instanceof Unauthenticated:
          return HttpNextResponse.domainError(error, 401);
        case error instanceof Unauthorized:
          return HttpNextResponse.domainError(error, 403);
        case error instanceof DomainError:
          const response = onError?.(error as T);
          if (response) {
            return response;
          }
          return HttpNextResponse.internalServerError();
        case error instanceof ZodError:
          return HttpNextResponse.domainError(new FormatError(error.message), 400);
        default:
          return HttpNextResponse.internalServerError();
      }
    }
  };
};

async function authentication(authenticated?: boolean): Promise<{
  user?: BetterUser;
  organization?: BetterOrganization;
  member?: BetterMember;
}> {
  if (authenticated === false) {
    return {
      user: undefined,
      organization: undefined,
      member: undefined,
    };
  }
  const session = await getSession();
  if (!session || !session.user) {
    throw new Unauthenticated("User is not authenticated");
  }
  const [organization, member] = await Promise.all([getOrganization(), getMember()]);

  return {
    user: session.user,
    organization: organization ? organization : ({} as BetterOrganization),
    member: member ? member : ({} as BetterMember),
  };
}

async function authorization(permissions: { [key: string]: string[] }): Promise<void> {
  const userHasPermission = await hasPermission(permissions);
  if (!userHasPermission) {
    throw new Unauthorized("You do not have permission to perform this action");
  }
}

function parseSeachParams<Q>(req: NextRequest, schema?: ZodSchema<Q>): Q {
  if (!schema) {
    return Object.fromEntries(req.nextUrl.searchParams.entries()) as Q;
  }
  return schema.parse(Object.fromEntries(req.nextUrl.searchParams.entries()));
}

async function parseParams<R>(params: Promise<R>, schema?: ZodSchema<R>): Promise<R> {
  const resolvedParams = await params;
  if (!schema) {
    return resolvedParams;
  }
  return schema.parse(resolvedParams);
}

async function parseBody<P>(req: NextRequest, schema?: ZodSchema<P>): Promise<P> {
  if (req.method === "GET" || req.method === "HEAD") {
    return {} as P; // No body for GET or HEAD requests
  }
  if (!schema) {
    try {
      const data = await req.json();
      return data as P;
    } catch (error) {
      return {} as P;
    }
  }
  return schema.parse(await req.json());
}
