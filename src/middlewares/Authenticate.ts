import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import ApiResponder from '../actions/ApiResponder';
import { AuthRequest } from '../interfaces/AuthRequest';
import UserService from '../services/UserService';

const SECRET_KEY = process.env.JWT_KEY as Secret;

export default async function authenticate(request: Request, response: Response, next: NextFunction) {
    const token = request.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return response.status(401).json(new ApiResponder(false, 'Token is missing', null));
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        const user = await new UserService().find((decoded as JwtPayload).id, (decoded as JwtPayload).email);

        (request as AuthRequest).user = user;
    } catch (error) {
        return response.status(401).json(new ApiResponder(false, 'Token is expired or invalid', null));
    }

    next();
}
