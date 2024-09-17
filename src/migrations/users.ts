import { Migration } from './_runner';

export class Users extends Migration {
    public up(): Promise<void> {
        this.sql = `CREATE TABLE users (
            id bigint unsigned NOT NULL AUTO_INCREMENT,
            name varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
            email varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
            password varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
            created_at timestamp NULL,
            updated_at timestamp NULL,
            PRIMARY KEY (id),
            UNIQUE KEY users_email_unique (email)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`

        return this._run();
    }

    public down(): Promise<void> {
        this.sql = `DROP TABLE IF EXISTS users`;

        return this._run('dropped');
    }
};
