


import { Request, Response } from 'express';
import { InternalServerError } from '../errors/InternalServerError';
import { usersService } from '../services/usersService';
import { DeleteUserByIdDTO, FindUsersByDTO } from '../types/dtos/usersDTOs';
import { NotAuthorizedError } from '../errors/not-authorized-error';

const signUp = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { newUser , userJwt} = await usersService.createUser({ email, password });
    if (!newUser || !userJwt) {
        throw new InternalServerError("an error occurred while creating the user");
    }
    req.session = { jwt: userJwt }
    res.status(201).send(newUser);
}

const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { user , userJwt} = await usersService.login({ email, password });
    if (!userJwt || !user) {
        throw new InternalServerError("an error occurred while logging in the user");
    }
    req.session = { jwt: userJwt }
    res.status(200).send(user);
}

// const getUserByFilters  = async (req: Request, res: Response) => {
//     const params : FindUsersByDTO =  req.query; 
//     const user = await usersService.findFirstUserByFilters(params);
//     if (!user) {
//         throw new InternalServerError("an error occurred while fetching the user");
//     }
//     res.status(200).send(user);
// }

const getUsers  = async (req: Request, res: Response) => {
    const params :FindUsersByDTO =  req.query; 
    const users = await usersService.findUsersByFilters(params);
    if (!users) {
        throw new InternalServerError("an error occurred while fetching the users");
    }
    res.status(200).send(users);
}

const howAmI = (req: Request, res: Response) => {
    console.log("currentPorcess", process.env.HOSTNAME || 'unknown');
    res.status(200).send({ currentUser: req.currentUser || null });
  
}

const logOut = (req: Request, res: Response) => {
    req.session = null;
    res.status(200).send({});
}

const deleteUser = async (req: Request, res: Response) => {
    const data :DeleteUserByIdDTO =  req.body;
    data.email = req.currentUser!.email
    data.id = req.currentUser!.id
    const user = await usersService.deleteUser(data);
    if (!user) {
        throw new InternalServerError("an error occurred while deleting the user");
    }
    res.status(200).send(user);
}



const userController = {
    signUp,
    signIn,
     getUsers,
    howAmI,
    logOut,
    deleteUser
}
export { userController };
