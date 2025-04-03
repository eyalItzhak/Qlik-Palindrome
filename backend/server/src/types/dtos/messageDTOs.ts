import { PaginationDTO } from "./paginationDTOs";

export interface CreateMessageDTO {
    senderId: string;
    content: string;
    palindrome ? :boolean
}

export interface GetMyMessagesDTO extends PaginationDTO {
    isPalindrome ? : boolean
    id ? : string
    userId ? : string
    content ? : string
}


export interface GetAllMessagesDTO extends GetMyMessagesDTO {
    email ? : string
}

export interface DeleteOneMessageDTO {
    id: string;
}

export interface UpdateMessageDTO {
    content: string;
    id : string
    palindrome ? : boolean
}

