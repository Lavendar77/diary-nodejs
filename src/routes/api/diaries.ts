import express from 'express';
import * as DiaryController from '../../controllers/DiaryController';
import Authenticate from '../../middlewares/Authenticate';

const router = express.Router();

router.use(Authenticate);

router.get('/', DiaryController.index);
router.post('/', DiaryController.store);

// router.get('/:id', DiaryController.show);

// router.put('/:id', DiaryController.update);

// router.delete('/:id', DiaryController.destroy);

export default router;
