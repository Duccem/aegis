import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ZodError, ZodSchema } from "zod";
import { auth, BetterOrganization, BetterUser, getSession } from "../auth/server";
import { DomainError } from "../types/domain-error";
import { Unauthenticated } from "../types/errors/unauthenticated";
import { Unauthorized } from "../types/errors/unauthorized";

type RouteHandlerParams<Q, P, R> = {
  req: NextRequest;
  user: BetterUser;
  organization: BetterOrganization;
  params: R;
  searchParams: Q;
  body: P;
};

type RouteHandler<Q, P, R> = (params: RouteHandlerParams<Q, P, R>) => Promise<NextResponse>;

type RouteHandlerOptions<Q, P, R> = {
  name: string;
  schema?: ZodSchema<P>;
  querySchema?: ZodSchema<Q>;
  paramsSchema?: ZodSchema<R>;
  authenticated?: boolean;
  permissions?: (user: BetterUser) => boolean;
};

export const routeHandler = <T extends DomainError, P, Q, R>(
  options: RouteHandlerOptions<Q, P, R> = {
    name: "default",
    authenticated: true,
    querySchema: undefined,
    schema: undefined,
    permissions: undefined,
  },
  handler: RouteHandler<Q, P, R>,
  onError?: (error: T) => NextResponse,
) => {
  return async (req: NextRequest, { params }: { params: Promise<R> }) => {
    const { user, organization } = await authentication(options.authenticated);
    authorization(user, options.permissions);

    const urlParams = await parseParams(params, options.paramsSchema);
    const searchParams = parseSeachParams<Q>(req, options.querySchema);
    const body = await parseBody<P>(req, options.schema);

    try {
      return handler({
        req,
        user,
        params: urlParams,
        searchParams,
        body,
        organization,
      });
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
          return HttpNextResponse.error(error.message);
        default:
          return HttpNextResponse.internalServerError();
      }
    }
  };
};

async function authentication(
  authenticated?: boolean,
): Promise<{ user: BetterUser; organization: BetterOrganization }> {
  if (authenticated === false) {
    return { user: {} as BetterUser, organization: {} as BetterOrganization };
  }
  const session = await getSession();
  if (!session || !session.user) {
    throw new Unauthenticated("User is not authenticated");
  }
  let organization: BetterOrganization | null = await auth.api.getFullOrganization({
    query: {
      membersLimit: 1,
    },
    headers: await headers(),
  });
  if (!organization) {
    organization = {} as BetterOrganization;
  }
  return { user: session.user as BetterUser, organization: organization as BetterOrganization };
}

function authorization(
  user: BetterUser | undefined,
  permissions?: (user: BetterUser) => boolean,
): void {
  if (!user) {
    return;
  }
  if (permissions && !permissions(user)) {
    throw new Unauthorized("User does not have the required permissions");
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

export class HttpNextResponse {
  static domainError(error: DomainError, statusCode: number): NextResponse {
    return NextResponse.json(
      {
        message: error.getMessage(),
      },
      { status: statusCode },
    );
  }

  static internalServerError(): NextResponse {
    return NextResponse.json(
      {
        code: "InternalServerError",
        message: "Internal server error",
        data: {},
      },
      { status: 500 },
    );
  }

  static noResponse(): NextResponse {
    return new NextResponse(null, { status: 204 });
  }

  static error(message: any): NextResponse {
    return NextResponse.json(
      {
        code: "BadRequest",
        message: message,
        data: {},
      },
      { status: 400 },
    );
  }

  static ok(): NextResponse {
    return new NextResponse(null, { status: 200 });
  }

  static created(): NextResponse {
    return new NextResponse(null, { status: 201 });
  }

  static json<JsonBody>(data: JsonBody): NextResponse {
    return NextResponse.json(data, { status: 200 });
  }
}
