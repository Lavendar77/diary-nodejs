import { Request, Response } from 'express';
import User from '../entities/User';
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
        const user = new User().new(
            request.body.name,
            request.body.email,
            request.body.password
        );
        user.validate(request.body.password_confirmation);

        // store the user
        new UserRepository()
            .store(user)
            .then((data: any) => {
                user.setId(data.insertId);

                const token = jwt.sign(user.only(['id', 'name', 'email']), process.env.JWT_KEY as Secret, {
                    expiresIn: '1 day',
                });

                return response
                    .status(201)
                    .json(new ApiResponder(true, 'User registered successfully', {
                        user: user.only(['id', 'name', 'email']),
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




/**
 * Authenticate a user.
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Response}
 */
export const login = (request: Request, response: Response) => {
    return response
        .json(new ApiResponder(true, 'User fetched successfully', {
            // user: user.toJSON(),
        }));
};
