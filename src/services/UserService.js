import bcrypt from 'bcrypt';
import { 
          getUserByIdModel, 
          postUserModels, 
          usersAllModel, 
          updateUserModel, 
          deleteUserModel,
          loginUserModels,
          updateConfirmEmailmodel
        } from '../models/UserModels.js';

import errorHandlerCredentials from '../utils/errorCredentials.js';

const saltRounds = 10; // Número de rounds para o bcrypt


const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const postUserService = async (nome, email, senha) => {
    const hashedPassword = await hashPassword(senha);
    const usuario = await postUserModels( nome, email, hashedPassword);
    return usuario
}

const updateConfirmEmailSevice = (usuario)=>{
  return updateConfirmEmailmodel(usuario);
}


const loginUserService = async (email, senha) => {

  const user = await loginUserModels(email);
  if (!user) {
    return null; 
  }

  const match = await bcrypt.compare(senha, user.senha);

  if (match) {
    return user; 
  }

  return null
}

const getUserByIdService = (userId) => {
  return getUserByIdModel(parseInt(userId)); 
};


const usersAllService = () => { 
  return usersAllModel();
}

const updateUserService = async (userId, nome, email, senha, idAdmin, role) => {
  const ifError = errorHandlerCredentials.checkDeleteSelf(userId, idAdmin, role);
 
  if(ifError) return (
    { 
      msg: ifError.msg, 
      status: ifError.status
    });

  const { nome: usuario } =  await updateUserModel(userId, nome, email, senha);
  return { "msg": ` ${usuario} atualizado com sucesso`, "status": 200};
}

const deleteUserService = async (idToDelete, role, idAdmin, res)=> {
  const ifError = errorHandlerCredentials.checkDeleteSelf(idToDelete, idAdmin, role);
  if(ifError) return (
    { 
      msg: ifError.msg, 
      status: ifError.status
    });
  const { nome } = await deleteUserModel(idToDelete);
  return { "msg": ` ${nome} deletado com sucesso`, "status": 200};
}




export default {
  postUserService,
  updateConfirmEmailSevice,
  loginUserService,
  getUserByIdService,
  usersAllService,
  updateUserService,
  deleteUserService
};

