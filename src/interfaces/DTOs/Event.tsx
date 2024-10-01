export interface Event {
    id: number;
    organizationId: number;
    creatorId: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    deadline: string;
    locationName: string;
}

export interface NewEvent {
    name: string;
    description: string;
    location: string;
    startDateTime: string;
    endDateTime: string;
    deadlineDateTime: string;
    organizationId: number | null;
}