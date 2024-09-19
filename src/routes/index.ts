import express, { Request, Response } from 'express';
import ApiResponder from '../actions/ApiResponder';

const router = express.Router();

router.get('/', (request: Request, response: Response) => {
    response.json(new ApiResponder(true, 'Welcome to Diary', null).toJson());
});

export default router;
