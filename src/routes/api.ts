import express from 'express';
import authRouter from './api/auth';
import userRouter from './api/user';

const router = express.Router();

router.use('/auth', authRouter);

router.use('/user', userRouter);

export default router;
