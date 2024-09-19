import { Request, Response } from 'express';
import ApiResponder from '../actions/ApiResponder';
import { AuthRequest } from '../interfaces/AuthRequest';




/**
 * Get the authenticated user.
 *
 * @param {AuthRequest|Request} request
 * @param {Response} response
 * @return {Response}
 */
export const show = async (request: AuthRequest|Request, response: Response) => {
    try {
        return response
            .json(new ApiResponder(true, 'User fetched successfully', {
                user: (request as AuthRequest).user,
            }));
    } catch (err: any) {
        return response
            .status(400)
            .json(new ApiResponder(false, err.message || 'Error', null));
    }
};
