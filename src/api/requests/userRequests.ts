import { UserDTO } from "../../interfaces/DTOs/User";
import { instance } from "../axios/instance"

export const getUser = async () => {

    try {
        const userProfile = await instance.get<UserDTO>('/user/profile')
        return userProfile.data;
    }
    catch (error) {
        console.error(error)
    }
}

export const getUserById = async (id: string) => {

    try {
        const userProfile = await instance.get<UserDTO>(`/user/profile/${id}`)
        return userProfile.data;
    }
    catch (error) {
        console.error(error)
    }
}