import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { HttpStatusCodes } from "../enums/HttpStatusCodes";

export default class LambdaResponder {
    public success: boolean;

    public constructor(
        public message: string,
        public data: any,
        public statusCode?: HttpStatusCodes,
        public headers?: {
            [header: string]: boolean | number | string;
        }
        | undefined,
    ) {
        this.success = (this.statusCode || 200) < 400;
    }

    public toApiGatewayResponse(): APIGatewayProxyStructuredResultV2 {
        return {
            statusCode: this.statusCode || 200,
            headers: this.headers || {},
            body: JSON.stringify({
                success: this.success,
                message: this.message,
                data: this.data,
            }),
        };
    }
}
