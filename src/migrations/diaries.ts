import { Migration } from './_runner';

export class Diaries extends Migration {
    public up(): Promise<void> {
        this.sql = `CREATE TABLE IF NOT EXISTS diaries (
            id bigint unsigned NOT NULL AUTO_INCREMENT,
            user_id bigint unsigned NOT NULL,
            title varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
            content LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
            created_at timestamp NULL,
            updated_at timestamp NULL,
            PRIMARY KEY (id),
            FOREIGN KEY diaries_user_id_foreign(user_id) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;

        return this._run();
    }

    public down(): Promise<void> {
        this.sql = `DROP TABLE IF EXISTS diaries`;

        return this._run('dropped');
    }
};
