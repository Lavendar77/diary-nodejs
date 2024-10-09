import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import UserService from '../services/UserService';

const SECRET_KEY = process.env.JWT_KEY as Secret;

export async function authenticateApiGateway(_event: any, _context: any) {
    const token = _event.headers.Authorization?.replace('Bearer ', '');

    if (!token) {
        return generateAuthResponse("user", "Deny", _event.routeArn);
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        const user = await new UserService().find((decoded as JwtPayload).id, (decoded as JwtPayload).email);

        return generateAuthResponse((user as any).id, "Allow", _event.routeArn, {
            user: user,
        });
    } catch (err) {
        return generateAuthResponse("user", "Deny", _event.routeArn);
    }
}

function generateAuthResponse(principalId: string, effect: any, arn: string, extra: any = null) {
    const policyDocument = {
        Version: "2012-10-17",
        Statement: [
            {
                Action: "execute-api:Invoke",
                Effect: effect,
                Resource: arn
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
