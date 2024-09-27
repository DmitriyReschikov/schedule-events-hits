import { OrganizationEntity } from "./Organization";
import { User } from "./User";

interface ApplicationForMembership {
    applicationId: number;
    organizationId: number;
    managerId: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: string;
}

export interface ApplicationView {
    application: ApplicationForMembership;
    user: User;
    organization: OrganizationEntity;
}