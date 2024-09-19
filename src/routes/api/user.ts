import express from 'express';
import * as UserController from '../../controllers/UserController';
import Authenticate from '../../middlewares/Authenticate';

const router = express.Router();

router.use(Authenticate);

router.get('/', UserController.show);

export default router;
