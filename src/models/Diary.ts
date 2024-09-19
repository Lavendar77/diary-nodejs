import Model from "./_model";

export default class Diary extends Model {
    private id: number|undefined;
    public user_id: number|undefined;
    public title: string|undefined;
    public content: string|undefined;

    public new(user_id: number, title: string, content: string): this {
        this.user_id = user_id;
        this.title = title;
        this.content = content;

        return this;
    }

    public setId(id: number): this {
        this.id = id;

        return this;
    }

    public getId(): number|undefined {
        return this.id;
    }
}
