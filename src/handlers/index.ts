import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2, Context, Handler } from "aws-lambda";


export const handler: Handler = async (
    _event: APIGatewayProxyEventV2,
    _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
    return {
        statusCode: 200,
        body: 'Hello World!',
    };
};
