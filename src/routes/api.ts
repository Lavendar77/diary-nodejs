import express, { Request, Response } from 'express';
import { ApiResponder } from '../actions/ApiResponder';
import { User } from '../entities/User';
import { ZodError } from 'zod';

const router = express.Router();

router.post('/register', (request: Request, response: Response) => {
    try {
        const user = new User(request.body.name, request.body.email);
        user.validate();
    } catch (err) {
        if (err instanceof ZodError) {
            return response
                .status(422)
                .json(new ApiResponder(false, 'Some inputs are invalid', err.format()))
        }

        throw err;
    }

    response.json(new ApiResponder(true, 'User registered successfully', null).toJson());
});

export default router;
