import express from 'express';
import UserController from '../controllers/UserController.js';
import { isAuth } from '../utils/middlewareJWT.js';

const router = express.Router();
router.post('/', UserController.postUserController);
router.get('/confirm/:token', UserController.confirmEmail);
router.post('/login', UserController.loginUserController);

router.get('/:id', isAuth, UserController.getUserByIdController);
router.get('/', isAuth, UserController.searchAllUsers); 
router.patch('/:id', isAuth, UserController.updateUserId);
router.delete('/:id', isAuth, UserController.deleteUserController);


export default router;
