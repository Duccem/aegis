---
applyTo: "**/ui/**/*.ts,**/ui/**/*.tsx"
---

# Project coding standards for UI layer

Apply the [general coding standards](./general.instructions.md) to the UI layer with the following additional instructions:

## General UI Layer Instructions

- The UI layer is responsible for the presentation of the application.
- It should be independent of the domain layer and other layers.
- The UI layer should not contain any business logic.
- The UI layer should use the domain layer to interact with the business logic.
- The UI layer should use the shared context for common utilities and types.
- The Components should be reusable and composable.
- The UI layer should follow the principles of component-based architecture.
- The components should use the shadcn components of the shared context.
- To style the components, use the Tailwind CSS utility classes.
- To forms use the shadcn form components of the shared context and react-hook-form.
- To manage the state of the components, use the Zustand and separate the state management logic from the UI components.
- To handle data fetching, use the `useQuery` and `useMutation` hooks from React Query.
- To tables use the shadcn table components of the shared context. and separate the table from the columns definition in separate files.
- To make the api calls use the API services of the context on the infrastructure layer.
- Put the hooks in the `hooks` folder of the context.
- Separate the components for each use case in the `components` folder of the context.

## Examples

You can use as examples the following:

- [Table Component](../../src/contexts/catalogue/item/ui/components/table/)
- [Item Form Component](../../src/contexts/catalogue/item/ui/components/create/form.tsx)
- [Custom Hook for Item API](../../src/contexts/catalogue/item/ui/hooks/use-item-complements.ts)
- [Store for Item State](../../src/contexts/catalogue/item/ui/store/item-table-store.ts)
