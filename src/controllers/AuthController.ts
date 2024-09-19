import { Request, Response } from 'express';
import { ZodError } from 'zod';
import ApiResponder from '../actions/ApiResponder';
import UserService from '../services/UserService';
import UserRegisterDto from '../dtos/User/UserRegisterDto';
import UserLoginDto from '../dtos/User/UserLoginDto';




/**
 * Register a new user.
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Response}
 */
export const register = async (request: Request, response: Response) => {
    try {
        const userRegisterDto = new UserRegisterDto(
            request.body.name,
            request.body.email,
            request.body.password,
            request.body.password_confirmation
        );
        const { user, token } = await new UserService().register(userRegisterDto);

        return response
            .status(201)
            .json(new ApiResponder(true, 'User registered successfully', {
                user: user.only(['id', 'name', 'email']),
                token: token,
            }));
    } catch (err: any) {
        if (err instanceof ZodError) {
            return response
                .status(422)
                .json(new ApiResponder(false, 'Some inputs are invalid', err.format()))
        }

        return response
            .status(400)
            .json(new ApiResponder(false, err.message || 'Error', null));
    }
};




/**
 * Authenticate a user.
 *
 * @param {Request} request
 * @param {Response} response
 * @return {Response}
 */
export const login = async (request: Request, response: Response) => {
    try {
        const userLoginDto = new UserLoginDto(
            request.body.email,
            request.body.password
        );
        const { user, token } = await new UserService().login(userLoginDto);

        return response
            .json(new ApiResponder(true, 'User logged in successfully', {
                user: user.only(['id', 'name', 'email']),
                token: token,
            }));
    } catch (err: any) {
        if (err instanceof ZodError) {
            return response
                .status(422)
                .json(new ApiResponder(false, 'Some inputs are invalid', err.format()))
        }

        return response
            .status(400)
            .json(new ApiResponder(false, err.message || 'Error', null));
    }
};
