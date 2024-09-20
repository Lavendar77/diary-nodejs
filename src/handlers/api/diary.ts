import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2, Context, Handler } from "aws-lambda";
import LambdaResponder from "../../actions/LambdaResponder";





export const list: Handler = async (
    _event: APIGatewayProxyEventV2,
    _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
    return new LambdaResponder(
        '',
        null
    );
};





export const store: Handler = async (
    _event: APIGatewayProxyEventV2,
    _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
    return new LambdaResponder(
        '',
        null
    );
};





export const view: Handler = async (
    _event: APIGatewayProxyEventV2,
    _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
    return new LambdaResponder(
        '',
        null
    );
};





export const update: Handler = async (
    _event: APIGatewayProxyEventV2,
    _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
    return new LambdaResponder(
        '',
        null
    );
};





export const destroy: Handler = async (
    _event: APIGatewayProxyEventV2,
    _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
    return new LambdaResponder(
        '',
        null
    );
};
