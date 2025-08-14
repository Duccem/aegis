import { UserRoles } from "./user-role";

export type Permission = Array<Lowercase<keyof typeof UserRoles>>;
