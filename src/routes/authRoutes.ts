import express from 'express';
import registerController from '../controllers/auth/registerController';
import sanitizeAndValidateRegisterRequest from '../middleware/sanitizeAndValidateRegisterRequest';

const authRouter = express.Router();

authRouter.post('/register', sanitizeAndValidateRegisterRequest, registerController);

export default authRouter;