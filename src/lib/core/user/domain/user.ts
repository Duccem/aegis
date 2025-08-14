import { Aggregate } from "@/lib/types/aggregate";
import { Primitives } from "@/lib/types/primitives";
import { DateValueObject, StringValueObject } from "@/lib/types/value-object";
import { Uuid } from "@/lib/types/value-objects/uuid";
import { Permission } from "./permissions";
import { UserPlan } from "./user-organization-plan";
import { UserRole } from "./user-role";

export class User extends Aggregate {
  constructor(
    id: Uuid,
    public name: StringValueObject,
    public email: StringValueObject,
    public organizationId: Uuid,
    public plan: UserPlan,
    public role: UserRole,
    createdAt: DateValueObject,
    updatedAt: DateValueObject,
  ) {
    super(id, createdAt, updatedAt);
  }

  toPrimitives(): Primitives<User> {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      organizationId: this.organizationId.value,
      plan: this.plan.value,
      role: this.role.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  static fromPrimitives(data: Primitives<User>) {
    return new User(
      new Uuid(data.id),
      new StringValueObject(data.name),
      new StringValueObject(data.email),
      new Uuid(data.organizationId),
      new UserPlan(data.plan),
      new UserRole(data.role),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt),
    );
  }

  hasPermissions(permissions: Permission): boolean {
    return permissions.includes(this.role.value);
  }
}
