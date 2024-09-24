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
        const { diaries } = await new DiaryService().getAll((request as any).user.id);

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
            .status(201)
            .json(new ApiResponder(true, 'Diary stored successfully', {
                diary: diary.toJSON(),
            }));
    } catch (err: any) {
        return response
            .status(400)
            .json(new ApiResponder(false, err.message || 'Error', null));
    }
};




/**
 * Get a specified diary for the user.
 *
 * @param {AuthRequest|Request} request
 * @param {Response} response
 * @return {Response}
 */
export const show = async (request: AuthRequest|Request, response: Response) => {
    try {
        const diary = await new DiaryService().find((request as any).user.id, Number(request.params.id));

        return response
            .json(new ApiResponder(true, 'Diary fetched successfully', {
                diary: diary,
            }));
    } catch (err: any) {
        return response
            .status(400)
            .json(new ApiResponder(false, err.message || 'Error', null));
    }
};




/**
 * Update a specified diary for the user.
 *
 * @param {AuthRequest|Request} request
 * @param {Response} response
 * @return {Response}
 */
export const update = async (request: AuthRequest|Request, response: Response) => {
    const diaryDto = new DiaryDto(request.body.title, request.body.content);

    try {
        const diary = await new DiaryService().update((request as any).user.id, Number(request.params.id), diaryDto);

        return response
            .json(new ApiResponder(true, 'Diary updated successfully', {
                diary: diary,
            }));
    } catch (err: any) {
        return response
            .status(400)
            .json(new ApiResponder(false, err.message || 'Error', null));
    }
};




/**
 * Delete a specified diary for the user.
 *
 * @param {AuthRequest|Request} request
 * @param {Response} response
 * @return {Response}
 */
export const destroy = async (request: AuthRequest|Request, response: Response) => {
    try {
        await new DiaryService().delete((request as any).user.id, Number(request.params.id));

        return response
            .status(204)
            .json(new ApiResponder(true, 'Diary deleted successfully', null));
    } catch (err: any) {
        return response
            .status(400)
            .json(new ApiResponder(false, err.message || 'Error', null));
    }
};
