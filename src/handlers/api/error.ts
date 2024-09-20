import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2, Context, Handler } from "aws-lambda";
import LambdaResponder from "../../actions/LambdaResponder";
import { HttpStatusCodes } from "../../enums/HttpStatusCodes";





export const handler: Handler = async (
    _event: APIGatewayProxyEventV2,
    _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
    return new LambdaResponder(
        'Route Not Found',
        null,
        HttpStatusCodes.NotFound
    );
};
