import { Primitives } from "@/lib/types/primitives";
import { Uuid } from "@/lib/types/value-objects/uuid";
import { Organization } from "../domain/organization";
import { OrganizationNotFound } from "../domain/organization-not-found";
import { OrganizationRepository } from "../domain/organization-repository";

export class GetOrganization {
  constructor(private repository: OrganizationRepository) {}

  async execute(id: string): Promise<Primitives<Organization> | null> {
    const organization = await this.repository.find(Uuid.fromString(id));
    if (!organization) {
      throw new OrganizationNotFound(id);
    }
    return organization.toPrimitives();
  }
}
