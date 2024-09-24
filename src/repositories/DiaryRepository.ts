import DatabaseConnect from "../actions/DatabaseConnect";
import DiaryDto from "../dtos/Diary/DiaryDto";
import Diary from "../models/Diary";
import EntityManager from "./_manager";

export default class DiaryRepository extends EntityManager {
    protected table: string = 'users';

    public async getAllForUser(userId: number): Promise<unknown> {
        let sql = 'SELECT * FROM diaries WHERE user_id = ?';

        return await DatabaseConnect.run(sql, [userId]);
    }

    public async storeForUser(userId: number, diaryDto: DiaryDto): Promise<unknown> {
        let sql = 'INSERT INTO diaries(user_id, title, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?)';

        let result = await DatabaseConnect.run(sql, [
            userId,
            diaryDto.title,
            diaryDto.content,
            this.db_timestamp,
            this.db_timestamp,
        ]);

        if (!(result as any).insertId) {
            throw new Error('Diary not inserted into the table');
        }

        return result;
    }

    public async findForUser(userID: number, diaryId: number): Promise<Diary> {
        let sql = 'SELECT * FROM diaries WHERE id = ? AND user_id = ? LIMIT 1';

        try {
            let result = await DatabaseConnect.run(sql, [diaryId, userID]);

            if (!(result as any).length) {
                throw new Error('Diary not found');
            }

            return Diary.fromObject((result as any)[0]);
        } catch(err) {
            throw err;
        }
    }

    public async updateForUser(userID: number, diaryId: number, diaryDto: DiaryDto): Promise<unknown> {
        let sql = 'UPDATE diaries SET title = ?, content = ?, updated_at = ? WHERE id = ? AND user_id = ?';

        try {
            let result = await DatabaseConnect.run(
                sql,
                [diaryDto.title, diaryDto.content, this.db_timestamp, diaryId, userID]
            );

            if (!result || (result && !Boolean((result as any).changedRows))) {
                throw new Error('Diary not updated');
            }

            return result;
        } catch(err) {
            throw err;
        }
    }

    public async deleteForUser(userId: number, diaryId: number): Promise<unknown> {
        let sql = 'DELETE FROM diaries WHERE id = ? AND user_id = ?';

        try {
            let result = await DatabaseConnect.run(sql, [diaryId, userId]);

            if (!result || (result && !Boolean((result as any).affectedRows))) {
                throw new Error('Diary does not exist or could not be deleted');
            }

            return result;
        } catch(err) {
            throw err;
        }
    }
}
