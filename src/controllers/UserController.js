import prisma from '../../prisma/prisma.js';
import UserService from '../services/UserService.js';
import errorHandler from '../utils/errorHandlerPrisma.js';


const getUserByIdController = async (req, res) => {

    const userId = req.params.id;
    try {
        const user = await UserService.getUserByIdService(userId);
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
        const { nome: nomeReturn } = await prisma.usuario.create({
            data: { nome, email, senha},
        });
        res.status(200).json( nomeReturn );
    }catch(error) {
        errorHandler.handleErrorPrisma(error, res);
    }
}

const searchAllUsers = async (_req, res) => {

    try {
        const users = await prisma.usuario.findMany();
    
        res.status(200).json(users);
    }catch(error) {
        errorHandler.handleErrorPrisma(error, res);

    }
}

const updateUserId = async (req, res) => {
    const userId = req.params.id;
    const { nome, email, senha} = req.body; 
    try {
        const user = await prisma.usuario.update({
            where: {
              id: parseInt(userId),
            },
            data: {
              nome,
              email,
              senha
            },
        })
        res.status(200).json(user);
    } catch(error) {
        errorHandler.handleErrorPrisma(error, res);
    }
}

export default  { 
    getUserByIdController,
    postUserController,
    searchAllUsers,
    updateUserId
};
