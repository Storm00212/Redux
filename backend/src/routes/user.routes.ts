import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateRegister, validateLogin } from '../middleware/user.middleware';

const router = Router();

router.post('/register', validateRegister, UserController.register);
router.post('/login', validateLogin, UserController.login);
router.get('/users', UserController.getUsers)

export default router;