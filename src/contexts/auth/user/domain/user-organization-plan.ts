import { Enum } from "@/contexts/shared/domain/value-objects/enum";

export enum UserOrganizationPlan {
  FREE = "free",
  PRO = "pro",
}
export class UserPlan extends Enum<UserOrganizationPlan> {
  constructor(value: UserOrganizationPlan) {
    super(value, Object.values(UserOrganizationPlan));
  }

  static fromString(value: string) {
    return new UserPlan(value as UserOrganizationPlan);
  }

  static free() {
    return new UserPlan(UserOrganizationPlan.FREE);
  }

  static pro() {
    return new UserPlan(UserOrganizationPlan.PRO);
  }
}
