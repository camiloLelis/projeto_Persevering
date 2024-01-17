import prisma from "../../prisma/prisma.js";


const getUserByIdModel = async (userId) => {
    const i = parseInt(userId)
    return await prisma.usuario.findUnique({ where: { id: i } });
}

const postUserModels = async (nome, email, senha) => {
    return await prisma.usuario.create({ data: { nome, email, senha } });   
}

const usersAllModel = async () => {
    return await prisma.usuario.findMany();
}

const updateUserModel = async (userId, nome, email, senha) => {
    const user = await prisma.usuario.update({
        where: {
        id: parseInt(userId),
        },
        data: { nome, email, senha},
    });
    return user;
}

const deleteUserModel = async (userId) => {
    return await prisma.usuario.delete({ where: { id: parseInt(userId) } });
}

export { getUserByIdModel, postUserModels, usersAllModel, updateUserModel, deleteUserModel };