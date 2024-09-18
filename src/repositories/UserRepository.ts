import DatabaseConnect from "../actions/DatabaseConnect";
import User from "../models/User";
import { hash } from "../modules/bcrypt";
import { EntityManager } from "./_manager";

export class UserRepository extends EntityManager {
    protected table: string = 'users';

    public store(user: User): Promise<unknown> {
        let sql = 'INSERT INTO users(name, email, password, created_at, updated_at) VALUES(?, ?, ?, ?, ?)';

        return DatabaseConnect.run(sql, [
            user.name,
            user.email.toLowerCase(),
            hash(user.getPassword()),
            this.db_timestamp,
            this.db_timestamp
        ]);
    }

    public async findById(userID: number|string): Promise<User> {
        let sql = 'SELECT * FROM users WHERE id = ? LIMIT 1';

        try {
            let result = await DatabaseConnect.run(sql, [userID]);

            return User.fromObject((result as any)[0]);
        } catch(err) {
            throw err;
        }
    }
}
