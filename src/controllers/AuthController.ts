import { Request, Response } from 'express';
import { User } from '../entities/User';
import { ZodError } from 'zod';
import { ApiResponder } from '../actions/ApiResponder';
import { UserRepository } from '../repositories/UserRepository';
import jwt, { Secret } from 'jsonwebtoken';




/**
 * Register a new user.
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Response}
 */
export const register = (request: Request, response: Response) => {
    try {
        const user = new User(
            request.body.name,
            request.body.email,
            request.body.password,
            request.body.password_confirmation
        );
        user.validate();

        // store the user
        new UserRepository(user)
            .store()
            .then((data: any) => {
                let userId = data.insertId;

                const token = jwt.sign({ id: userId.toString(), email: user.email }, process.env.JWT_KEY as Secret, {
                    expiresIn: '2 days',
                });

                return response
                    .status(201)
                    .json(new ApiResponder(true, 'User registered successfully', {
                        user: user.toJSON(),
                        token: token,
                    }))
            })
            .catch((err) => {
                return response
                    .status(400)
                    .json(new ApiResponder(false, err.message, null));
            });
    } catch (err) {
        if (err instanceof ZodError) {
            return response
                .status(422)
                .json(new ApiResponder(false, 'Some inputs are invalid', err.format()))
        }

        throw err;
    }
};
