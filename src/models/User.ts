import Model from "./_model";

export default class User extends Model {
    private id: number|undefined;
    public name: string|undefined;
    public email: string|undefined;
    private password: string|undefined;

    protected hidden: string[] = [
        "password",
    ];

    public new(name: string, email: string, password: string): this {
        this.name = name;
        this.email = email;
        this.password = password;

        return this;
    }

    public setId(id: number): this {
        this.id = id;

        return this;
    }

    public getId(): number|undefined {
        return this.id;
    }

    public getPassword(): string|undefined {
        return this.password;
    }
}
