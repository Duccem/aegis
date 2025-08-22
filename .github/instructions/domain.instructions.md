---
applyTo: "**/domain/**/*.ts"
---

# Project coding standards for domain layer

Apply the [general coding standards](./general.instructions.md) to the domain layer with the following additional instructions:

## General Domain Layer Instructions

- On the domain layer is where the business logic lives.
- The domain layer should not depend on any other layers.
- The domain layer should be independent of any frameworks or libraries.
- On the domain layer, we store aggregates roots, entities, value objects, domain events, domain errors, domain services, and repositories interfaces.
- The classes should be supported by the basis of the @helsa/ddd package, which provides the necessary base classes and utilities for implementing Domain-Driven Design (DDD) concepts.
  - The `Aggregate` class provides the base functionality for aggregate roots.
  - The value-objects should extend the respective base value object class
  - The name constructors like `fromPrimitives` and `toPrimitives` are used to convert between the domain objects and their primitive representations. using the `Primitives` type from shared context.

## Files

- Each aggregate root should have its own directory.
- Each entity, value object, domain event, domain error, and domain service should be in its own file.
- The entities and repositories should be in the same directory as the aggregate root they belong to.
- Domain events should be in a separate directory within the aggregate root directory.
- Domain errors should be in a separate directory within the aggregate root directory.
- Domain services should be in a separate directory within the aggregate root directory.
- Domain specifications and invariants should be in a separate directory within the aggregate root directory.
- Domain criteria should be in a separate directory within the aggregate root directory.

## Aggregate Roots

- An aggregate root is the main entry point for an aggregate.
- It should encapsulate the business logic and enforce invariants.
- It should provide methods to interact with the aggregate.
- It should not expose its internal state directly; use methods to manipulate the state.

### Example of an Aggregate Root

You can use as example this: [Item Aggregate](../../src/contexts/catalogue/item/domain/item.ts)

## Entities

- An entity is a domain object that has a unique identity.
- It should encapsulate its own state and behavior.
- It should provide methods to manipulate its state.

#### Example of an Entity

You can use as example this: [Unit Entity](../../src/contexts/catalogue/item/domain/unit.ts)

## Value Objects

- A value object is a domain object that represents a descriptive aspect of the domain.
- It should be immutable and should not have an identity.
- It should provide methods to manipulate its state, if necessary.
- It should support on corresponding class of the shared context, such as `StringValueObject`, `NumberValueObject`, or `Enum`.
- Each property on an entity or aggregate root should be a value object, if applicable.
- Each value object should be in its own file.
- Make the the value objects necessaries for the aggregate root and entities to the aggregate

#### Example of a Value Object

You can use as example this:

- [Item Status Value Object](../../src/contexts/catalogue/item/domain/item-status.ts)
- [Item Name Value Object](../../src/contexts/catalogue/item/domain/item-name.ts)

### Domain Events

- A domain event is a representation of something that has happened in the domain.
- It should be immutable and should not have an identity.
- It should provide a way to convert to and from its primitive representation.

#### Example of a Domain Event

You can use as example this: [Item Created Domain Event](../../src/contexts/catalogue/item/domain/events/item-created.ts)

### Domain Errors

- A domain error is a representation of an error that can occur in the domain.
- It should provide a way to convert to and from its primitive representation.

#### Example of a Domain Error

You can use as example this: [Item Not Found Domain Error](../../src/contexts/catalogue/item/domain/errors/item-not-found.ts)

### Specifications and Invariants

- Specifications and invariants are used to define business rules and constraints.
- They should be implemented as classes that extend the `Specification` base classes of shared context.
- Each specification should be in its own file.
- Specifications should be used to validate the state of aggregates and entities.
- Invariants should be used to enforce business rules and constraints within aggregates.
- Invariants should be implemented as methods within the aggregate root or entity classes.

#### Example of a Specification

You can use as example this: [Item Name Specification](../../src/contexts/catalogue/item/domain/specification/can-update-item.ts)

### Repositories

- A repository is an interface that defines methods for accessing and manipulating aggregates.
- It should provide methods to save, find, and delete aggregates.
- Each repository should be in its own file.
- The search and list methods should receive an criteria object to filter the results.
- Use the Criteria class from shared context to define the search criteria.
- Avoid to make methods for each retrive or filter use case, instead use a generic search method that receives a criteria object.

#### Example of a Repository Interface

You can use as example this: [Item Repository Interface](../../src/contexts/catalogue/item/domain/item-repository.ts)

### Other Services Ports

- Other services ports are interfaces that define methods for accessing and manipulating external services.
- They should provide methods to interact with external services, such as payment gateways, email services, etc.
- Each service port should be in its own file.

#### Example of a Service Port Interface

An example of a service port interface could be an email service port that defines methods for sending emails like:

[User Email Service Port](../../src/contexts/auth/user/domain/user-mailer.ts)
