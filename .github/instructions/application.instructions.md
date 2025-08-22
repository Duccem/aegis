---
applyTo: "**/application/**/*.ts"
---

# Project coding standards for application layer

Apply the [general coding standards](./general.instructions.md) to the application layer with the following additional instructions:

## General Application Layer Instructions

- The application layer is responsible for orchestrating the use cases of the application.
- It should not contain any business logic; that should be in the domain layer.
- The application layer should depend on the domain layer
- The application layer should provide a clear API for the presentation layer to interact with the domain layer.
- The application layer should use the domain layer to perform operations and return results.
- The application layer should handle the use cases of the application.
- The application layer should not depend on any frameworks or libraries.
- The application layer should contain use cases, commands, queries, and DTOs (Data Transfer Objects).
- Each use case should contain his dto and error types.

## Naming Conventions

- The use case file and class should only have the name of the use case, e.g., `create-order.ts` for the `CreateOrder` class.

## Files

- Each use case should be in its own file.
- Each dto should be in the use case file that uses it.

## Examples

You can use as examples the following:

- [Save Item Use Case](../../src/contexts/catalogue/item/application/save-item.ts)
- [List Items Use Case](../../src/contexts/catalogue/item/application/list-items.ts)
- [Archive Item Use Case](../../src/contexts/catalogue/item/application/archive-item.ts)
