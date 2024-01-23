import prisma from "../../prisma/prisma.js";


const postUserModels = async (nome, email, senha) => {
    return await prisma.usuario.create({ data: { nome, email, senha } });   
}

const updateConfirmEmailmodel = async (usuario)=>{
    return await prisma.usuario.update({
        where: {
        id: usuario.id,
        },
        data: { emailConfirmation: true },
    });
}

const loginUserModels = async (email, senha) => {
    return await prisma.usuario.findFirst({ where: { email, senha } });
}

const getUserByIdModel = async (userId) => {
    return await prisma.usuario.findUnique(
        { where: { 
            id: userId,
            } 
        });
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

export { 
    postUserModels, 
    updateConfirmEmailmodel, 
    loginUserModels,
    getUserByIdModel, 
    usersAllModel, 
    updateUserModel, 
    deleteUserModel
};
