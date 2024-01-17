import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();
router.get('/:id', UserController.getUserByIdController);
router.post('/', UserController.postUserController);
router.get('/', UserController.searchAllUsers); 
router.patch('/:id', UserController.updateUserId);
router.delete('/:id', UserController.deleteUserController);

export default router;
