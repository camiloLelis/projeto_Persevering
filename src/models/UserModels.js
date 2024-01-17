import prisma from "../../prisma/prisma.js";


const getUserByIdModel = async (userId) => {
    console.log("teste_models");
    const i = parseInt(userId)
    return await prisma.usuario.findUnique({ where: { id: i } });
}

export { getUserByIdModel};