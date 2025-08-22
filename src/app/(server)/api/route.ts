import { ApiReference } from "@scalar/nextjs-api-reference";

const config = {
  apiDirectory: "app/api",
  basePath: "/api",
  title: "My API",
  version: "1.0.0",
  description: "This is my API documentation",
  contact: {
    name: "Support Team",
    email: "ducen29@gmail.com",
    url: "https://example.com/support",
  },
};

export const GET = ApiReference({
  url: "/openapi.yml",
});
