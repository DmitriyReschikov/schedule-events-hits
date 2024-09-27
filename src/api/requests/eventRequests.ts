import { instance } from "../axios/instance";
import { Event, NewEvent } from "../../interfaces/DTOs/Event";

export const createEvent = async (event : NewEvent) => {
    try {
        await instance.post('/event/create', {event})
    }
    catch (error) {
        console.error(error)
    }
}

export const updateEvent = async (event : NewEvent, id: number) => {
    try {
        await instance.post(`/event/${id}`, {event})
    }
    catch (error) {
        console.error(error)
    }
}

export const deleteEvent = async (id: number) => {
    try {
        await instance.delete(`/event/${id}`)
    }
    catch (error) {
        console.error(error)
    }
}

export const getEvents = async (queryParams: string) => {
    try {
        const events = await instance.get<Event[]>(`/event?${queryParams}`, )
        return events.data;
    }
    catch (error) {
        console.error(error)
    }
}

export const getMyEvents = async () => {
    try {
        const events = await instance.get<Event[]>(`/event/my`)
        return events.data;
    }
    catch (error) {
        console.error(error)
    }
}

export const subscribeOnEvent = async (id: string) => {
    try {
        await instance.post(`/event/${id}/add`)
    }
    catch (error) {
        console.error(error)
    }
}

export const unsubscribeFromEvent = async (id: string) => {
    try {
        await instance.post(`/event/${id}/remove`)
    }
    catch (error) {
        console.error(error)
    }
}