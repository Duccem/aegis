import { NextResponse } from "next/server";
import { DomainError } from "../types/domain-error";

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

  static json<JsonBody>(data: JsonBody): NextResponse {
    return NextResponse.json({ data }, { status: 200 });
  }

  static noResponse(status: 200 | 201 | 204 = 204): NextResponse {
    return new NextResponse(null, { status });
  }
}
