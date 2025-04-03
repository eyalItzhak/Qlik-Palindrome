import { PaginationDTO } from "./paginationDTOs";

export interface CreateUserDTO {
    email: string;
    password: string;
}

export interface FindSingleUserByDTO {
    id?: string;
    email?: string;
}

export interface FindUsersByDTO extends PaginationDTO {
    id?: string;
    email?: string;
    permission?: string;
}

export interface LoginUserDTO {
    email: string;
    password: string;
}

export interface DeleteUserByIdDTO {
    email: string;
    password: string;
    id : string;
}