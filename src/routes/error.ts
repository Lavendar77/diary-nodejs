import express, { Request, Response } from 'express';
import ApiResponder from '../actions/ApiResponder';

const router = express.Router();

router.all('*', (request: Request, response: Response) => {
    response
        .status(404)
        .json(new ApiResponder(false, 'Route Not Found', null).toJson());
});

export default router;
