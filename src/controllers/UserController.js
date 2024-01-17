import prisma from '../../prisma/prisma.js';
import userService from '../services/UserService.js';
import errorHandler from '../utils/errorHandlerPrisma.js';


const getUserByIdController = async (req, res) => {

    const userId = req.params.id;
    try {
        const user = await userService.getUserByIdService(userId);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'Usuário não encontrado.' });
        }
        res.status(200).json(user);
    }catch(error) {
        errorHandler.handleErrorPrisma(error, res);
    }
}

const postUserController = async (req, res) => {
    const { nome, email, senha} = req.body;
    try {
        const  NomeUsuario =  await userService.postUserService(nome, email, senha);
        res.status(200).json({ "usuario cadastrado": NomeUsuario });
    }catch(error) {
        errorHandler.handleErrorPrisma(error, res);
    }
}

const searchAllUsers = async (_req, res) => {

    try {
        const users = await userService.usersAllService();
    
        res.status(200).json(users);
    }catch(error) {
        errorHandler.handleErrorPrisma(error, res);

    }
}

const updateUserId = async (req, res) => {
    const userId = req.params.id;
    const { nome, email, senha} = req.body; 
    try {
        const user = await userService.updateUserService(userId, nome, email, senha);
        res.status(200).json({ "up usuário": user });
    } catch(error) {
        errorHandler.handleErrorPrisma(error, res);
    }
}

const deleteUserController = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userService.deleteUserService(userId);
        return res.status(200).json({ "deletado": user });
    } catch(error) {
        errorHandler.handleErrorPrisma(error, res);
    };
}

export default  { 
    getUserByIdController,
    postUserController,
    searchAllUsers,
    updateUserId,
    deleteUserController
};
