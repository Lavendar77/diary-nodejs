import { APIGatewayProxyStructuredResultV2, Context, Handler } from "aws-lambda";
import LambdaResponder from "../../actions/LambdaResponder";
import DiaryService from "../../services/DiaryService";
import { HttpStatusCodes } from "../../enums/HttpStatusCodes";
import DiaryDto from "../../dtos/Diary/DiaryDto";





export const list: Handler = async (
    _event: any,
    _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
    try {
        const { diaries } = await new DiaryService().getAll(
            JSON.parse(_event.requestContext.authorizer.lambda.extras).user.id
        );

        return new LambdaResponder(
            'Diaries fetched successfully',
            {
                diaries: diaries,
            }
        );
    } catch (err: any) {
        return new LambdaResponder(
            err.message || 'Error',
            null,
            HttpStatusCodes.BadRequest
        )
    }
};





export const store: Handler = async (
    _event: any,
    _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
    const requestBody = JSON.parse(_event.body as any);
    const diaryDto = new DiaryDto(requestBody.title, requestBody.content);

    try {
        const diary = await new DiaryService().store(
            JSON.parse(_event.requestContext.authorizer.lambda.extras).user.id,
            diaryDto
        );

        return new LambdaResponder(
            'Diary stored successfully',
            {
                diary: diary.toJSON(),
            },
            HttpStatusCodes.Created
        );
    } catch (err: any) {
        return new LambdaResponder(
            err.message || 'Error',
            null,
            HttpStatusCodes.BadRequest
        );
    }
};





export const view: Handler = async (
    _event: any,
    _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
    console.log(_event)
    try {
        const diary = await new DiaryService().find(
            JSON.parse(_event.requestContext.authorizer.lambda.extras).user.id,
            Number(_event.pathParameters.id)
        );

        return new LambdaResponder(
            'Diary fetched successfully',
            {
                diary: diary,
            }
        );
    } catch (err: any) {
        return new LambdaResponder(
            err.message || 'Error',
            null,
            HttpStatusCodes.BadRequest
        );
    }
};





export const update: Handler = async (
    _event: any,
    _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
    const requestBody = JSON.parse(_event.body as any);
    const diaryDto = new DiaryDto(requestBody.title, requestBody.content);

    try {
        const diary = await new DiaryService().update(
            JSON.parse(_event.requestContext.authorizer.lambda.extras).user.id,
            Number(_event.pathParameters.id),
            diaryDto
        );

        return new LambdaResponder(
            'Diary updated successfully',
            {
                diary: diary,
            }
        );
    } catch (err: any) {
        return new LambdaResponder(
            err.message || 'Error',
            null,
            HttpStatusCodes.BadRequest
        );
    }
};





export const destroy: Handler = async (
    _event: any,
    _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
    try {
        await new DiaryService().delete(
            JSON.parse(_event.requestContext.authorizer.lambda.extras).user.id,
            Number(_event.pathParameters.id)
        );

        return new LambdaResponder(
            'Diary deleted successfully',
            null,
            HttpStatusCodes.NoContent
        );
    } catch (err: any) {
        return new LambdaResponder(
            err.message || 'Error',
            null,
            HttpStatusCodes.BadRequest
        );
    }
};
