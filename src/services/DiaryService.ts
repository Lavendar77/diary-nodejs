import DiaryDto from "../dtos/Diary/DiaryDto";
import Diary from "../models/Diary";
import DiaryRepository from "../repositories/DiaryRepository";


export default class DiaryService {
    public async getAll(userId: number): Promise<{diaries: any}> {
        const diaries = await new DiaryRepository().getAllForUser(userId);

        return { diaries };
    }

    public async store(userId: number, diaryDto: DiaryDto): Promise<Diary> {
        diaryDto.validate();

        const diary = new Diary().new(
            userId,
            diaryDto.title,
            diaryDto.content,
        );

        const data: any = await new DiaryRepository().storeForUser(userId, diaryDto);
        diary.setId(data.insertId);

        return diary;
    }

    public async find(userId: number, diaryId: number): Promise<Diary> {
        return await new DiaryRepository().findForUser(userId, diaryId);
    }

    public async update(userId: number, diaryId: number, diaryDto: DiaryDto): Promise<Diary> {
        diaryDto.validate();

        await new DiaryRepository().updateForUser(userId, diaryId, diaryDto);

        return this.find(userId, diaryId);
    }

    public async delete(userId: number, diaryId: number): Promise<void> {
        await new DiaryRepository().deleteForUser(userId, diaryId);
    }
}
