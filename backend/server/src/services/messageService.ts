import { messageRepository } from "../repositories/messageRepository"
import { CreateMessageDTO, GetMyMessagesDTO ,GetAllMessagesDTO, DeleteOneMessageDTO, UpdateMessageDTO } from "../types/dtos/messageDTOs"
import { isPalindrome} from "../utils/isPalindrome"

const saveMassage = async (data : CreateMessageDTO ) => {
        const isPalindromeResult = isPalindrome(data.content)
        data.palindrome = isPalindromeResult
        return await messageRepository.createMessage(data)
}

const getMyMessages = async (data : GetMyMessagesDTO) => {
        return await messageRepository.findMessagesByParams(data)
}

const getAllMessages = async (data : GetAllMessagesDTO) => {
       return  await messageRepository.findAllMessages(data)
}

const deleteMessage = async (data : DeleteOneMessageDTO) => {
        return await messageRepository.deleteMessage(data)
}

const updateMessage = async (data : UpdateMessageDTO) => {
        const isPalindromeResult = isPalindrome(data.content)
        data.palindrome = isPalindromeResult
        return await messageRepository.updateMessage(data)
}



export const massageService = {saveMassage ,getMyMessages ,getAllMessages ,deleteMessage ,updateMessage}