import moment from 'moment';
import DatabaseConnect from '../actions/DatabaseConnect';

export default class EntityManager {
    protected db_timestamp: string = moment().format('YYYY-MM-DD HH:mm:ss');

    protected table: string = '';
    protected sqlQuery: string = '';
    protected sqlValue: any[] = [];

    public query(): this {
        this.sqlQuery = `SELECT * FROM ${this.table}`;

        return this;
    }

    public where(column: string, value: any): this {
        this.sqlQuery += (
            this.sqlQuery.length
            ? (
                this.sqlQuery.includes('WHERE')
                ? ` AND ${column} = ?`
                : ` WHERE ${column} = ?`
            )
            : `SELECT * FROM ${this.table} WHERE ${column} = ?`
        );
        this.sqlValue.push(value);

        return this;
    }

    public async first(): Promise<any> {
        this.sqlQuery += this.sqlQuery.includes('LIMIT')
            ? ''
            : ' LIMIT 1';

        try {
            let data: any = await DatabaseConnect.run(this.sqlQuery, this.sqlValue);

            return data[0];
        } catch(err) {
            throw err;
        }
    }

    public async get(): Promise<any> {
        try {
            let data: any = await DatabaseConnect.run(this.sqlQuery, this.sqlValue);

            return data;
        } catch(err) {
            throw err;
        }
    }
}
