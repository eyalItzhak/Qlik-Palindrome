
import mongoose from 'mongoose';
import { User, UserDoc } from '../models/users';
import { CreateUserDTO, DeleteUserByIdDTO, FindSingleUserByDTO, FindUsersByDTO } from '../types/dtos/usersDTOs';
import { Message } from '../models/message';
import { ExtendPaginationResponse } from '../types/dtos/paginationResponseDTOs';


 const createUser = async ( data :CreateUserDTO)  => {
    return await User.create(data);
  }

 const findspecificUserByParams= async (params :FindSingleUserByDTO) => { 
    return await User.findOne(params);
  }

  const findManyUsersByParams= async({ page = 1, limit = 10, ...filters }: FindUsersByDTO) => { 
    const totalMatchingUsers = await User.countDocuments(filters);
    const users = await User.find(filters).skip((page - 1) * limit).limit(limit);

    return {
      currentPage: page,
      totalItems: totalMatchingUsers,
      totalPages: Math.ceil(totalMatchingUsers / limit),
      hasMore: totalMatchingUsers > page * limit,
      data: users,
    } as ExtendPaginationResponse<UserDoc>;
  }

  const deleteUserById = async (params : DeleteUserByIdDTO) => { 
    await Message.deleteMany({userId: new mongoose.Types.ObjectId(params.id) })
    return await User.findOneAndDelete({id : new mongoose.Types.ObjectId(params.id)});
  }


  export const userRepository ={createUser , findspecificUserByParams ,findManyUsersByParams ,deleteUserById}