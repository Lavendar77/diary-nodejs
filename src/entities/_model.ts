export class Model {
    protected hidden: string[] = [];

    public toJSON(): object {
        let object: { [key: string]: any } = {};

        Object.keys(this).forEach(key => {
            if (!this.hidden.includes(key)) {
                object[key] = (this as any)[key];
            }
        });

        return object;
    }
}
