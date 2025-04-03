


import { Request, Response } from 'express';
import { massageService } from '../services/messageService';
import { InternalServerError } from '../errors/InternalServerError';
import { NotFoundResourceError } from '../errors/not-found-resource';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { GetAllMessagesDTO, GetMyMessagesDTO, UpdateMessageDTO } from '../types/dtos/messageDTOs';

const postMessage = async (req: Request, res: Response) => {
    const { messageContent } = req.body;
    const msg = await massageService.saveMassage({ content: messageContent, senderId: req.currentUser!.id })
    if (!msg) {
        throw new InternalServerError("an error occurred while creating the message");
    }
    res.status(201).send(msg);
}
//here
const getMyMessages = async (req: Request, res: Response) => {
    const data :GetMyMessagesDTO = req.query;
    data.userId = req.currentUser!.id
    const messages = await massageService.getMyMessages(data);
    if (!messages) {
        throw new InternalServerError("an error occurred while fetching the messages");
    }
    res.status(200).send(messages);
}


const getAllUserMsg = async (req: Request, res: Response) => {
    const filter:GetAllMessagesDTO  = req.query;
    const messages = await massageService.getAllMessages(filter);
    if (!messages) {
        throw new InternalServerError("an error occurred while fetching the messages");
    }
    res.status(200).send(messages);
}

const deleteMessage = async (req: Request, res: Response) => {
    const deleteMsgParam = req.body;
    const foundMsg = await massageService.getMyMessages({ id: deleteMsgParam.id, userId: req.currentUser!.id });

    if (!foundMsg || foundMsg.totalItems === 0) {
        throw new NotFoundResourceError("could not find you message to delete")
    }
    const msg = await massageService.deleteMessage(deleteMsgParam);
    if (!msg) {
        throw new InternalServerError("an error occurred while deleting the message");
    }
    if (msg.deletedCount === 0) {
        throw new NotFoundResourceError("cannot found the message to delete")
    }
    res.status(200).send(msg);
}

const updateMessage = async (req: Request, res: Response) => {
   
    const updateMsgParam :UpdateMessageDTO = req.body;
    const foundMsg = await massageService.getMyMessages({ id: updateMsgParam.id, userId: req.currentUser!.id });
    if (!foundMsg || foundMsg.totalItems === 0) {
        throw new NotAuthorizedError();
    }
    const msg = await massageService.updateMessage(updateMsgParam);
    if (!msg) {
        throw new InternalServerError("an error occurred while updating the message");
    }

    if (msg.matchedCount === 0) {
        throw new NotFoundResourceError("cannot found the message to update")
    }

    res.status(200).send(msg);
}



export const messageController = {
    postMessage,
    getMyMessages,
    getAllUserMsg,
    deleteMessage,
    updateMessage
}

