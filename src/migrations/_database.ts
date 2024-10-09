import { Migration } from './_runner';

export class _Database extends Migration {
    public up(): Promise<void> {
        this.sql = `CREATE DATABASE IF NOT EXISTS diary_app;`

        return this._run();
    }

    public down(): Promise<void> {
        this.sql = `DROP TABLE IF EXISTS users`;

        return this._run('dropped');
    }
};
