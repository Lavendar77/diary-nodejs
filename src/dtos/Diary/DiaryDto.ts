import { z } from "zod";

export default class DiaryDto {
    constructor(
        public readonly title: string,
        public readonly content: string
    ) {}

    public validate() {
        return z.object({
            title: z.string(),
            content: z.string(),
        })
            .required()
            .parse({
                title: this.title,
                content: this.content,
            });
    }
}
