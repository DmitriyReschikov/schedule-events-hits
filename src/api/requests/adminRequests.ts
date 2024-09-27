import { OrganizationView } from "../../interfaces/DTOs/Organization";
import { instance } from "../axios/instance";

export const getOrganizations = async () => {   
    try {
        const organizations = await instance.get<OrganizationView[]>('/organization?size=5000')
        return organizations.data;
    }
    catch (error) {
        console.error(error)
    }
}

export const createOrganization = async (name: string) => {
    try {
        await instance.post('/admin/create_organization', {name})
    }
    catch (error) {
        console.error(error)
    }
}

export const updateOrganization = async (name: string, id: number) => {
    try {
        await instance.post(`/admin/organization/${id}`, {name})
    }
    catch (error) {
        console.error(error)
    }
}

export const deleteOrganization = async (id: number) => {
    try {
        await instance.delete(`/admin/organization/${id}`)
    }
    catch (error) {
        console.error(error)
    }
}