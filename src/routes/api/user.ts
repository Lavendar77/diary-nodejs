import express from 'express';
import * as UserController from '../../controllers/UserController';
import { authenticate } from '../../middlewares/Authenticate';

const router = express.Router();

router.use(authenticate);

router.get('/', UserController.show);

export default router;
