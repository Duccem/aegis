---
applyTo: "**/*.ts,**/*.tsx"
---

# Project general standard instructions

## Naming Conventions

- Use `kebab-case` for file names and directories.
- Use `PascalCase` for class, types, interfaces and components names.
- use `camelCase` for variables, functions, and methods.
- use `UPPER_CASE` for constants.
- use nouns for class names.
- use verbs for function and method names.
- use singular nouns for use cases.

## Code Style

- Use 2 spaces for indentation.
- Use single quotes for strings.
- Use semicolons at the end of statements.
- Use `===` and `!==` for comparisons.
- Use arrow functions for anonymous functions.
- Use template literals for string interpolation.
- Use destructuring for objects and arrays.
- Use `const` for variables that are not reassigned.
- Use `let` for variables that are reassigned.
- Use `async/await` for asynchronous code.
- Use `try/catch` for error handling.

## Project Structure

```
.
├── src
│   ├── apps
│   │   ├── (app)
│   │   ├── (server)
│   ├── contexts
│   │   ├── shared
│   │   │   ├── domain
│   │   │   ├── infrastructure
│   │   │   ├── ui
│   │   │   │   ├── hooks
│   │   │   │   ├── components
│   │   │   │   │   ├── aegis
│   │   │   │   │   ├── shadcn
│   │   │   │   │   ├── animate-ui
│   │   │   │   ├── store
│   │   ├── auth
│   │   ├── catalogue
│   │   │   ├── domain
│   │   │   ├── infrastructure
│   │   │   ├── application
│   │   │   ├── ui
│   │   │   │   ├── hooks
│   │   │   │   ├── components
│   │   │   │   ├── store
└── public
```

- The project is structured into contexts, each representing a bounded context or feature.
- Each context has its own `domain`, `infrastructure`, `application`, and `ui` layers.
- The `ui` layer contains hooks, components, and store management.
- The `apps` directory contains the main application and server code.
- The `public` directory contains static assets.
- The `shared` context contains common code that can be reused across different contexts.
- The `shared` context is further divided into `domain`, `infrastructure`, and `ui` layers to maintain separation of concerns.
- The `ui` layer in the `shared` context contains reusable components and hooks that can be used across different contexts.
- The `store` directory in the `ui` layer contains state management logic, such as Zustand stores or Redux slices, that can be shared across contexts.
- The `components` directory in the `ui` layer contains reusable UI components, organized by design system or library (e.g., Aegis, Shadcn, Animate UI).
- The `hooks` directory in the `ui` layer contains custom hooks that can be reused across different contexts.
- The `application` layer in each context contains use cases and application logic that orchestrates the interaction between the domain and infrastructure layers.
- The `infrastructure` layer in each context contains the implementation details, such as API clients, database access, and external services.
- The `domain` layer in each context contains the core business logic, entities, and value objects that define the context's behavior and rules.
- The `apps` directory can contain multiple applications, such as a web application, mobile application, or server-side application, each with its own entry point and configuration.
- The `public` directory can contain static assets, such as images, fonts, and other files that are served directly to the client.
- The project structure is designed to promote modularity, reusability, and separation of concerns, making it easier to maintain and scale the codebase as the project grows.
- Each context can be developed and tested independently, allowing for parallel development and easier collaboration among team members.
