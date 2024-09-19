import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import ApiResponder from '../actions/ApiResponder';
import { AuthRequest } from '../interfaces/AuthRequest';

const SECRET_KEY = process.env.JWT_KEY as Secret;

export default function authenticate(request: Request, response: Response, next: NextFunction) {
    const token = request.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return response.status(401).json(new ApiResponder(false, 'Token is missing', null));
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        (request as AuthRequest).user = decoded;
    } catch (error) {
        return response.status(401).json(new ApiResponder(false, 'Token is invalid', null));
    }

    next();
}
