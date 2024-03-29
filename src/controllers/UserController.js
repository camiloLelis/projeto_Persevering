import userService from '../services/UserService.js';
import errorHandlerPrisma from '../utils/errorHandlerPrisma.js';
import { generateToken, tokenToconfirmEmail, isAuthEmailConfirmed } from '../utils/middlewareJWT.js';
import  { sendConfirmationEmail } from '../utils/sendEmail.js';


const postUserController = async (req, res) => {
    const { nome, email, senha} = req.body;
    try {
        const  usuario =  await userService.postUserService(nome, email, senha);
        const token = tokenToconfirmEmail(usuario);
        sendConfirmationEmail(usuario.email, token);
        res.status(200).json({ MSG: 'Usuário registrado. Verifique seu e-mail para confirmar.' });
    }catch(error) {
        errorHandlerPrisma.handleErrorPrisma(error, res);
    }
}

const confirmEmail =  async (req, res) => {
    const { token } = req.params;

    const confirmationToken = isAuthEmailConfirmed(token);
  
    if (!confirmationToken || confirmationToken.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'Token inválido ou expirado.' });
    }
    await userService.updateConfirmEmailSevice(confirmationToken); 
    
    const jwtGenereted = generateToken(confirmationToken);
  
    res.status(200).json({ token: jwtGenereted, message: 'E-mail confirmado com sucesso.' });
};



const loginUserController = async (req, res) => {
    const { email, senha } = req.body;
    if(!email || !senha) return res.status(400).json({ "mensagem": "Email ou senha inválidos." });
    try {
        const user = await userService.loginUserService(email, senha);


        if (!user) {
            return res.status(401).json({ "mensagem": "Email ou senha inválidos." });
        }
        const jwtGenereted = generateToken(user)
        return res.status(200).json({ "MSG": "login efetuado","token": jwtGenereted });     
    } catch (error) {
        errorHandlerPrisma.handleErrorPrisma(error, res);       
    }
}



const getUserByIdController = async (req, res) => {

    const userId = parseInt(req.params.id);
    try {
        const user = await userService.getUserByIdService(userId);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'Usuário não encontrado.' });
        }
        res.status(200).json(user);
    }catch(error) {
        errorHandlerPrisma.handleErrorPrisma(error, res);
    }
}


const searchAllUsers = async (_req, res) => {

    try {
        const users = await userService.usersAllService();
    
        res.status(200).json(users);
    }catch(error) {
        errorHandlerPrisma.handleErrorPrisma(error, res);

    }
}

const updateUserId = async (req, res) => {
    const userId = req.params.id;
    const { nome, email, senha} = req.body; 
    try {
        const user = await userService.updateUserService(userId, nome, email, senha);
        res.status(200).json({ "up usuário": user });
    } catch(error) {
        errorHandlerPrisma.handleErrorPrisma(error, res);
    }
}

const deleteUserController = async (req, res) => {
    const idToDelete = parseInt(req.params.id);
    const { id: idAdmin, role, name } = req.usuario;
    if (!idAdmin || !idToDelete) return res.status(400).json({ "mensagem": "Id não informado." });
    try {
        const user = await userService.deleteUserService(idToDelete, role, idAdmin,res);
        return res.status(user.status).json({msg: user.msg, t: "fffff"});
    } catch(error) {
        errorHandlerPrisma.handleErrorPrisma(error, res);
    };
}



export default  { 
    postUserController,
    confirmEmail,
    loginUserController,
    getUserByIdController,
    searchAllUsers,
    updateUserId,
    deleteUserController
};
