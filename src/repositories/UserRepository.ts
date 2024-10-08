import DatabaseConnect from "../actions/DatabaseConnect";
import User from "../models/User";
import { Hash } from "../modules/bcrypt";
import EntityManager from "./_manager";

export default class UserRepository extends EntityManager {
    protected table: string = 'users';

    public async store(user: User): Promise<unknown> {
        let sql = 'INSERT INTO users(name, email, password, created_at, updated_at) VALUES(?, ?, ?, ?, ?)';

        try {
            let result = await DatabaseConnect.run(sql, [
                user.name,
                user.email?.toLowerCase(),
                Hash(user.getPassword() as string),
                this.db_timestamp,
                this.db_timestamp
            ]);

            if (!(result as any).insertId) {
                throw new Error('User not inserted into the table');
            }

            return result;
        } catch (err) {
            throw err;
        }
    }

    public async findById(userID: number|string): Promise<User> {
        let sql = 'SELECT * FROM users WHERE id = ? LIMIT 1';

        try {
            let result = await DatabaseConnect.run(sql, [userID]);

            if (!(result as any).length) {
                throw new Error('User not found');
            }

            return User.fromObject((result as any)[0]);
        } catch(err) {
            throw err;
        }
    }
}
