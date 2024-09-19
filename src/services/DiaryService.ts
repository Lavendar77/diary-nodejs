import DiaryDto from "../dtos/Diary/DiaryDto";
import Diary from "../models/Diary";
import { DiaryRepository } from "../repositories/DiaryRepository";


export default class DiaryService {
    public async index(userId: number): Promise<{diaries: any}> {
        const diaries = await new DiaryRepository().getAll(userId);

        return { diaries };
    }

    public async store(userId: number, diaryDto: DiaryDto): Promise<Diary> {
        diaryDto.validate();

        const diary = new Diary().new(
            userId,
            diaryDto.title,
            diaryDto.content,
        );

        const data: any = await new DiaryRepository().store(userId, diaryDto);
        diary.setId(data.insertId);

        return diary;
    }
}
