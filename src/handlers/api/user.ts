import { APIGatewayProxyStructuredResultV2, Context, Handler } from "aws-lambda";
import LambdaResponder from "../../actions/LambdaResponder";





export const handler: Handler = async (
    _event: any,
    _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
    const user = JSON.parse(_event.requestContext.authorizer.extras).user;

    return new LambdaResponder(
        'User fetched successfully',
        {
            user: user,
        }
    );
};
