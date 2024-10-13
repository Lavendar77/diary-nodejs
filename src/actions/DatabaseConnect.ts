import dotenv from "dotenv";
import mysql, { Connection, ConnectionConfig } from 'mysql2';

dotenv.config();

export default new class DatabaseConnect {
    run(sql: string, data: any[] = []): Promise<unknown> {
        const connection: Connection = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        } as ConnectionConfig);

        connection.connect();

        return new Promise((resolve: any, reject: any) => {
            connection.execute(sql, data, (err, result, fields) => {
                if (err) {
                    reject(err);
                }

                resolve(result);
            });
        });
    };

    start(sql: string, data: any[] = []): Promise<unknown> {
        const connection: Connection = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS
        } as ConnectionConfig);

        connection.connect();

        return new Promise((resolve: any, reject: any) => {
            connection.execute(sql, data, (err, result, fields) => {
                if (err) {
                    reject(err);
                }

                resolve(result);
            });
        });
    };
}
