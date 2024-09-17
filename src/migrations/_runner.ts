import DB from '../actions/DatabaseConnect';

export class Migration {
    protected sql: string = '';

    public _run(): Promise<void> {
        return DB.run(this.sql)
            .then((result: any) => {
                console.log("\x1b[32m", `${this.constructor.name} table created successfully...`);
            })
            .catch((error: any) => {
                console.error(`${this.constructor.name} migration failed...`, error);
            });
    }
}
