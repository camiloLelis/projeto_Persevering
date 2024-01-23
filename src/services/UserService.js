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

const postUserService = async (nome, email, senha) => {
    const usuario = await postUserModels( nome, email, senha);
    return usuario
}

const updateConfirmEmailSevice = (usuario)=>{
  return updateConfirmEmailmodel(usuario);
}


const loginUserService = async (email, senha) => {
  const user = await loginUserModels(email, senha);
  return user;
}

const getUserByIdService = (userId) => {
  return getUserByIdModel(parseInt(userId)); 
};


const usersAllService = () => { 
  return usersAllModel();
}

const updateUserService = async (userId, nome, email, senha) => {
  const { nome: usuario } =  await updateUserModel(userId, nome, email, senha);
  return usuario;
}

const deleteUserService = async (idToDelete, role, idAdmin, res)=> {
  const havemessage = errorHandlerCredentials.checkDeleteSelf(idToDelete, idAdmin, res);
  if(havemessage) return { "msg": 'vc não pode deletar você mesmo.', "status": 401};
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

