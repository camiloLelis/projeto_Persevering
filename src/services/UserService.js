// services/UserService.js
import { getUserByIdModel, postUserModels, usersAllModel, updateUserModel, deleteUserModel } from '../models/UserModels.js';

const getUserByIdService = (userId) => {
  return getUserByIdModel(userId); 
};

const postUserService = async (nome, email, senha) => {
   const { nome: usuario } = await postUserModels(nome, email, senha);
   return usuario
}

const usersAllService = () => { 
  return usersAllModel();
}

const updateUserService = async (userId, nome, email, senha) => {
  const { nome: usuario } =  await updateUserModel(userId, nome, email, senha);
  return usuario;
}

const deleteUserService = async (userId) => {
  const { nome } = await deleteUserModel(userId);
  return nome;
}

export default {
  getUserByIdService,
  postUserService,
  usersAllService,
  updateUserService,
  deleteUserService
};
