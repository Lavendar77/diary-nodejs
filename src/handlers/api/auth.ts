import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2, Context, Handler } from "aws-lambda";
import LambdaResponder from "../../actions/LambdaResponder";
import UserRegisterDto from "../../dtos/User/UserRegisterDto";
import UserService from "../../services/UserService";
import { HttpStatusCodes } from "../../enums/HttpStatusCodes";
import { ZodError } from "zod";
import UserLoginDto from "../../dtos/User/UserLoginDto";





export const register: Handler = async (
    _event: APIGatewayProxyEventV2,
    _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
    try {
        const requestBody = JSON.parse(_event.body as any);
        const userRegisterDto = new UserRegisterDto(
            requestBody.name,
            requestBody.email,
            requestBody.password,
            requestBody.password_confirmation
        );

        const { user, token } = await new UserService().register(userRegisterDto);

        return new LambdaResponder(
            'User registered successfully',
            {
                user: user.only(['id', 'name', 'email']),
                token: token,
            },
            HttpStatusCodes.Created
        );
    } catch (err: any) {
        if (err instanceof ZodError) {
            return new LambdaResponder(
                'Some inputs are invalid',
                err.format(),
                HttpStatusCodes.Unprocessable
            );
        }

        return new LambdaResponder(
            err.message || 'Error',
            null,
            HttpStatusCodes.BadRequest
        );
    }
};





export const login: Handler = async (
    _event: APIGatewayProxyEventV2,
    _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
    const requestBody = JSON.parse(_event.body as any);

    try {
        const userLoginDto = new UserLoginDto(
            requestBody.email,
            requestBody.password
        );
        const { user, token } = await new UserService().login(userLoginDto);

        return new LambdaResponder(
            'User logged in successfully',
            {
                user: user.only(['id', 'name', 'email']),
                token: token,
            },
            HttpStatusCodes.Accepted
        );
    } catch (err: any) {
        if (err instanceof ZodError) {
            return new LambdaResponder(
                'Some inputs are invalid',
                err.format(),
                HttpStatusCodes.Unprocessable
            );
        }

        return new LambdaResponder(
            err.message || 'Error',
            null,
            HttpStatusCodes.BadRequest
        );
    }
};
