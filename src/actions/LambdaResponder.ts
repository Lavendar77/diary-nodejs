import { HttpStatusCodes } from "../enums/HttpStatusCodes";

export default class LambdaResponder {
    public success: boolean;
    public message: string;
    public data: any;

    public constructor(
        message: string,
        data: any,
        public statusCode?: HttpStatusCodes,
        public headers?: {
            [header: string]: boolean | number | string;
        }
        | undefined,
    ) {
        this.success = (this.statusCode || 200) < 400;
        this.message = message;
        this.data = data;
    }
}
