import { BadRequestError } from "../errors/BadRequestError";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { userRepository } from "../repositories/userRepository";
import { CreateUserDTO, DeleteUserByIdDTO, FindUsersByDTO, LoginUserDTO } from "../types/dtos/usersDTOs";
import { authService } from "./authService";
import { passwordService } from "./passwordService";
const createUser = async (createUserDTO: CreateUserDTO) => {
    const existingUser = await userRepository.findspecificUserByParams({ email: createUserDTO.email });
    if (existingUser) {
        throw new BadRequestError("email in use");
    }
    createUserDTO.password = await passwordService.toHash(createUserDTO.password);
    const newUser = await userRepository.createUser(createUserDTO);
    const userJwt = authService.generateUserJwt({id: newUser.id, email: newUser.email, permission: newUser.permission });
    return {newUser ,userJwt};
}


const findUsersByFilters = async (params: FindUsersByDTO) => {
    const users = await userRepository.findManyUsersByParams(params);
    if (!users) {
        throw new BadRequestError("Users not found");
    }
    return users;
}

const login = async (data: LoginUserDTO) => {
    const user = await findAndMatchUser(data);
    const userJwt = authService.generateUserJwt({id: user.id, email: user.email, permission: user.permission });
    return {user ,userJwt};
}

const deleteUser = async (data: DeleteUserByIdDTO) => {
    const user = await findAndMatchUser(data)
    const result = await userRepository.deleteUserById(data);
    if (!result) {
        throw new BadRequestError("User not found");
    }
    return user;
}

const findAndMatchUser = async (data: { email: string ,  password:string}) => {
    const user = await userRepository.findspecificUserByParams({ email: data.email });
    if (!user) {
        throw new NotAuthorizedError();
    }
    const isMatch = await passwordService.compare(user.password, data.password);
    if (!isMatch) {
        throw new NotAuthorizedError();
    }
    return user;
}






export const usersService = { createUser,  findUsersByFilters, login , deleteUser } 
