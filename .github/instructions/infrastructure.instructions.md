---
applyTo: "**/infrastructure/**/*.ts"
---

# Project coding standards for infrastructure layer

Apply the [general coding standards](./general.instructions.md) to the infrastructure layer with the following additional instructions:

## General Infrastructure Layer Instructions

- The infrastructure layer is responsible for providing the technical implementation of the application.
- It should depend on the domain layer and the application layer.
- The infrastructure layer should not contain any business logic; that should be in the domain layer.
- The infrastructure layer should have all the technical details of the application, such as database access, external services, and other technical concerns.
- The infrastructure layer should provide implementations for the repositories defined in the domain layer.
- The infrastructure layer should provide implementations for the services defined in the application layer.

## Naming Conventions

- The files names should have the name of the interface they implement and the prefix of the specific technology, e.g., `drizzle-item-repository.ts` for the `DrizzleItemRepository` class that implements `ItemRepository` from domain layer.
- The classes should be named with the technology prefix, e.g., `DrizzleItemRepository`, `PrismaItemRepository`, etc.

## Examples

You can use as examples the following:

- [Drizzle Item Repository](../../src/contexts/catalogue/item/infrastructure/drizzle-item-repository.ts)
- [Supabase User Avatar Uploader Service](../../src/contexts/auth/user//infrastructure//supabase-user-storage.ts)
- [Resend Organization Mailer Service](../../src/contexts/auth/organization/infrastructure/email/resend-organization-mailer.ts)\
- [Http Item API Client](../../src/contexts/catalogue/item/infrastructure/http-item-api.ts)
