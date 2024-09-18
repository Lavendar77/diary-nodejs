import { Request, Response } from 'express';
import { ApiResponder } from '../actions/ApiResponder';
import { AuthRequest } from '../interfaces/AuthRequest';
import { UserRepository } from '../repositories/UserRepository';




/**
 * Get the authenticated user.
 *
 * @param {AuthRequest|Request} request
 * @param {Response} response
 * @return {Response}
 */
export const show = async (request: AuthRequest|Request, response: Response) => {
    const user = await new UserRepository().findById((request as any).user.id);

    return response
        .json(new ApiResponder(true, 'User fetched successfully', {
            user: user,
        }));
};
