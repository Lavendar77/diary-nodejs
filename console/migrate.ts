import { Users } from "../src/migrations/users";
import { Diaries } from "../src/migrations/diaries";
import { exit } from "process";

const users = new Users().up();
const diaries = new Diaries().up();

Promise.all([users, diaries])
    .finally(() => {
        exit();
    })
