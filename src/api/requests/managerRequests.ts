import { Event } from "../../interfaces/DTOs/Event";
import { ApplicationView } from "../../interfaces/DTOs/ManagerApp";
import { UserDTO } from "../../interfaces/DTOs/User";
import { instance } from "../axios/instance";

export const registerManager = async (companyId: string) => {
    try {
        await instance.post('/manager/register', {companyId})
    }
    catch (error) {
        console.error(error)
    }
}

export const rejectManagerApp = async (appId: number) => {
    try {
        await instance.post(`/manager/application/${appId}/reject` )
    }
    catch (error) {
        console.error(error)
    }
}

export const approveManagerApp = async (appId: number) => {
    try {
        await instance.post(`/manager/application/${appId}/approve`, {})
    }
    catch (error) {
        console.error(error)
    }
}

export const getUsersFromEvent = async (eventId: number) => {
    try {
        const users = await instance.get<UserDTO[]>(`/manager/event/${eventId}/users`)
        return users.data
    }
    catch (error) {
        console.error(error)
    }
}

export const getMyEvents = async (queryParams: string) => {
    try {
        const events = await instance.get<Event[]>(`/manager/event/my?${queryParams}`)
        return events.data
    }
    catch (error) {
        console.error(error)
    }
}

export const getAppsToBeManager = async (queryParams: string) => {
    try {
        const events = await instance.get<ApplicationView[]>(`/manager/event/my?${queryParams}`)
        return events.data
    }
    catch (error) {
        console.error(error)
    }
}
