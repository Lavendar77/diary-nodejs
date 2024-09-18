import DatabaseConnect from "../actions/DatabaseConnect";
import User from "../entities/User";
import { hash } from "../modules/bcrypt";
import { EntityManager } from "./_manager";

export class UserRepository extends EntityManager {
    /**
     * Store a new resource.
     *
     * @param {User} user
     * @returns {Promise<unknown>}
     */
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
}
