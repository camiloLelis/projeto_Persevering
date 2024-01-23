import express from 'express';
import UserController from '../controllers/UserController.js';
import { isAuth } from '../utils/middlewareJWT.js';

const router = express.Router();
router.get('/:id', UserController.getUserByIdController);
router.post('/', UserController.postUserController);
router.get('/', UserController.searchAllUsers); 
router.patch('/:id', UserController.updateUserId);
router.delete('/:id', isAuth,UserController.deleteUserController);
router.post('/login', UserController.loginUserController);
router.get('/confirm/:token', UserController.confirmEmail);


export default router;
