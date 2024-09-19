import { Request, Response } from 'express';
import ApiResponder from '../actions/ApiResponder';
import { AuthRequest } from '../interfaces/AuthRequest';
import DiaryDto from '../dtos/Diary/DiaryDto';
import DiaryService from '../services/DiaryService';




/**
 * Get the diaries for the user.
 *
 * @param {AuthRequest|Request} request
 * @param {Response} response
 * @return {Response}
 */
export const index = async (request: AuthRequest|Request, response: Response) => {
    try {
        const { diaries } = await new DiaryService().index((request as any).user.id);

        return response
            .json(new ApiResponder(true, 'Diaries fetched successfully', {
                diaries: diaries,
            }));
    } catch (err: any) {
        return response
            .status(400)
            .json(new ApiResponder(false, err.message || 'Error', null));
    }
};




/**
 * Store a new diary for the user.
 *
 * @param {AuthRequest|Request} request
 * @param {Response} response
 * @return {Response}
 */
export const store = async (request: AuthRequest|Request, response: Response) => {
    const diaryDto = new DiaryDto(request.body.title, request.body.content);

    try {
        const diary = await new DiaryService().store((request as any).user.id, diaryDto);

        return response
            .json(new ApiResponder(true, 'Diaries fetched successfully', {
                diary: diary.toJSON(),
            }));
    } catch (err: any) {
        return response
            .status(400)
            .json(new ApiResponder(false, err.message || 'Error', null));
    }
};
