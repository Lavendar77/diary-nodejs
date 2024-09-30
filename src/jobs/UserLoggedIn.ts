import User from "../models/User";
import Job from "./Job";

export class UserLoggedIn extends Job {
    public user: User;

    constructor(params: { user: User }) {
        super();
        this.user = params.user;
    }

    handle() {
        console.log(`✔︎ ${this.user?.name} logged in!`);
    }
}
