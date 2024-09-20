import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { HttpStatusCodes } from "../enums/HttpStatusCodes";

export default class LambdaResponder implements APIGatewayProxyStructuredResultV2 {
    public success: boolean;
    public statusCode: number;
    public headers: { [header: string]: boolean | number | string } | undefined;
    public body: string;

    public constructor(
        public message: string,
        public data: any,
        statusCode?: HttpStatusCodes,
        headers?: { [header: string]: boolean | number | string }
    ) {
        this.success = (statusCode || 200) < 400;
        this.statusCode = statusCode || 200;
        this.headers = headers || {};
        this.body = JSON.stringify({
            success: this.success,
            message: this.message,
            data: this.data,
        });
    }
}
