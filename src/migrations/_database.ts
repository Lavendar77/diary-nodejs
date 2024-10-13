import { Migration } from './_runner';
import dotenv from "dotenv";

dotenv.config();

export class _Database extends Migration {
    public up(): Promise<void> {
        this.sql = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`

        return this._start();
    }

    public down(): Promise<void> {
        this.sql = `DROP DATABASE IF EXISTS ${process.env.DB_NAME}`;

        return this._run('dropped');
    }
};
