export interface UserDTO {
    id: string;
    username: string;
    email: string;
    roles: string[];
}

export interface User extends UserDTO {
    password: string;
}