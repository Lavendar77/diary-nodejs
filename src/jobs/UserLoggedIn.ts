import User from "../models/User";
import Job from "./Job";

export class UserLoggedIn extends Job {
    constructor(public user: User) {
        super();
    }

    handle() {
        console.log(`✔︎ ${this.user.name} logged in!`);
    }
}
