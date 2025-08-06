import { adminAc, defaultStatements } from "better-auth/plugins";
import { createAccessControl } from "better-auth/plugins/access";

const statement = {
  ...defaultStatements,
} as const;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  ...adminAc.statements,
});

