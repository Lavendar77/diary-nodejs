import DatabaseConnect from "../actions/DatabaseConnect";
import { User } from "../entities/User";
import { hash } from "../modules/bcrypt";
import { EntityManager } from "./_manager";

export class UserRepository extends EntityManager {
    constructor(public user: User) {
        super();
    }

    public store(): Promise<unknown> {
        let sql = 'INSERT INTO users(name, email, password, created_at, updated_at) VALUES(?, ?, ?, ?, ?)';

        return DatabaseConnect.run(sql, [
            this.user.name,
            this.user.email.toLowerCase(),
            hash(this.user.getPassword()),
            this.db_timestamp,
            this.db_timestamp
        ]);
    }
}
