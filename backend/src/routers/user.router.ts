import { Router } from 'express';
import UserController from '../controllers/user.controller.js';

const router = Router();

router.get('/getAll', UserController.getAllUsers);
router.delete('/:id', UserController.deleteUser);
export default router;
