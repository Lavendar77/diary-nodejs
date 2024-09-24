import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import ApiResponder from '../actions/ApiResponder';
import { AuthRequest } from '../interfaces/AuthRequest';
import UserService from '../services/UserService';

const SECRET_KEY = process.env.JWT_KEY as Secret;

export async function authenticate(request: Request, response: Response, next: NextFunction) {
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

export async function authenticateApiGateway(_event: any, _context: any) {
    const token = _event.authorizationToken?.replace('Bearer ', '');

    if (!token) {
        return generateAuthResponse("user", "Deny", _event.methodArn);
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        const user = await new UserService().find((decoded as JwtPayload).id, (decoded as JwtPayload).email);

        return generateAuthResponse((user as any).id, "Allow", _event.methodArn, {
            user: user,
        });
    } catch (err) {
        return generateAuthResponse("user", "Deny", _event.methodArn);
    }
}

function generateAuthResponse(principalId: string, effect: any, methodArn: string, extra: any = null) {
    if (!effect || !methodArn) return null;

    const policyDocument = {
        Version: "2012-10-17",
        Statement: [
            {
                Action: "execute-api:Invoke",
                Effect: effect,
                Resource: methodArn
            }
        ],
    };

    return {
        principalId,
        policyDocument,
        context: {
            extras: JSON.stringify(extra)
        },
    };
}
