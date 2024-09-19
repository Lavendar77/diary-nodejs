import express from 'express';
import authRouter from './api/auth';
import userRouter from './api/user';
import diariesRouter from './api/diaries';

const router = express.Router();

router.use('/auth', authRouter);

router.use('/user', userRouter);

router.use('/diaries', diariesRouter);

export default router;
