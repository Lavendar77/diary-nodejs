import DatabaseConnect from "../actions/DatabaseConnect";
import DiaryDto from "../dtos/Diary/DiaryDto";
import EntityManager from "./_manager";

export default class DiaryRepository extends EntityManager {
    protected table: string = 'users';

    public async getAll(userId: number): Promise<unknown> {
        let sql = 'SELECT * FROM diaries WHERE user_id = ?';

        return await DatabaseConnect.run(sql, [userId]);
    }

    public async store(userId: number, diaryDto: DiaryDto): Promise<unknown> {
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
}
