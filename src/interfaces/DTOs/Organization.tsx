export interface OrganizationView {
    id: number;
    name: string;
}

export interface OrganizationEntity extends OrganizationView {
    googleCalendarId: string;
}