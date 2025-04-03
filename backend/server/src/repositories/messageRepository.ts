import { Message, MessageDoc } from "../models/message";
import { User } from "../models/users";
import { CreateMessageDTO, DeleteOneMessageDTO, GetAllMessagesDTO, GetMyMessagesDTO, UpdateMessageDTO } from "../types/dtos/messageDTOs";
import  { Types } from 'mongoose';
import { buildQuery } from "../utils/mongoDbQuerry";
import { BasePaginationResponse, ExtendPaginationResponse } from "../types/dtos/paginationResponseDTOs";;


const buildQueryConditions = (params: GetAllMessagesDTO) => {
    const conditions = [];

    if (params.userId) {
        conditions.push({ _id: new Types.ObjectId(params.userId) });
    }

    if (params.email) {
        conditions.push({ email: params.email });
    }

    return conditions;
};

const buildMessageConditions = (params: GetAllMessagesDTO) => {
    const messageConditions = [];
    if (params.isPalindrome !== undefined) {
        messageConditions.push({ "messages.isPalindrome": Boolean(params.isPalindrome) });
    }
    if (params.content) {
        messageConditions.push({ "messages.content": params.content });
    }

    if (params.id) {
        messageConditions.push({ "messages._id": new Types.ObjectId(params.id) });
    }
    return messageConditions;
};

const buildPipelineForAllMessages = (params: GetAllMessagesDTO, page: number, pageSize: number) => {
    const pipeline = [];

    const userConditions = buildQueryConditions(params);
    if (userConditions.length > 0) {
        pipeline.push({ $match: { $or: userConditions } });
    }

    pipeline.push({ $skip: (page - 1) * pageSize });
    pipeline.push({ $limit: pageSize });

    pipeline.push({
        $lookup: {
            from: "messages",
            localField: "_id",
            foreignField: "userId",
            as: "messages",
        }
    });

    pipeline.push({ $unwind: "$messages" });
    
    const messageConditions = buildMessageConditions(params);
    if (messageConditions.length > 0) {
        pipeline.push({ $match: { $or: messageConditions } });
    }
      pipeline.push({
        $group: {
            _id: "$_id",
            email: { $first: '$email' },
            permission: { $first: '$permission' },
            messages: { $push: "$messages" }
        }
    });

    return pipeline;
    
};


const createMessage = async (data: CreateMessageDTO) => {
    return await Message.create({ userId: data.senderId, content: data.content, isPalindrome: data.palindrome });
}

const findMessagesByParams = async ({ page = 1, limit = 10, ...filters }: GetMyMessagesDTO) => {

    const fieldGroups = {
        id: ["id", "userId"],
        Boolean: ["isPalindrome"]
    }
    const query = buildQuery(filters, fieldGroups);
    const totalMatchingMsg = await Message.countDocuments(query);
    const messages = await Message.find(query).skip((page - 1) * limit).limit(limit);

    return {
        currentPage: page,
        totalItems: totalMatchingMsg,
        totalPages: Math.ceil(totalMatchingMsg / limit),
        hasMore: totalMatchingMsg > page * limit,
        data: messages,
    } as ExtendPaginationResponse<MessageDoc>;
}

const findAllMessages = async ({page= 1, limit = 10 ,... filter}: GetAllMessagesDTO) => {
    const aggregatePipeline = buildPipelineForAllMessages(filter, page, limit);
    const data = await User.aggregate(aggregatePipeline);
    return {data} as BasePaginationResponse<any>
}

const deleteMessage = async (param: DeleteOneMessageDTO) => {
    return await Message.deleteOne(param);
}

const updateMessage = async (param: UpdateMessageDTO) => {
    return await Message.updateOne({ id: param.id }, { content: param.content, isPalindrome: param.palindrome });
}

export const messageRepository = { createMessage, findMessagesByParams, findAllMessages, deleteMessage, updateMessage };