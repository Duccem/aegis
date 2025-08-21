import { Enum } from "@/contexts/shared/domain/value-objects/enum";

export enum UserRoles {
  ADMIN = "admin",
  MEMBER = "member",
}
export class UserRole extends Enum<UserRoles> {
  constructor(value: UserRoles) {
    super(value, Object.values(UserRoles));
  }

  static fromString(value: string) {
    return new UserRole(value as UserRoles);
  }

  static admin() {
    return new UserRole(UserRoles.ADMIN);
  }
}
