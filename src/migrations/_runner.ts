import DatabaseConnect from '../actions/DatabaseConnect';

export class Migration {
    protected sql: string = '';

    public _run(action: string = 'created'): Promise<void> {
        return DatabaseConnect.run(this.sql)
            .then(() => {
                console.log("\x1b[32m", `${this.constructor.name} table ${action} successfully...`);
            })
            .catch((error: any) => {
                console.error(`${this.constructor.name} migration failed...`, error);
            });
    }
}
