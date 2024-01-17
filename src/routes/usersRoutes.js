import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();
console.log("router teste");
router.get('/:id', UserController.getUserByIdController);
router.post('/', UserController.postUserController);
router.get('/', UserController.searchAllUsers); 
router.patch('/:id', UserController.updateUserId);

export default router;
