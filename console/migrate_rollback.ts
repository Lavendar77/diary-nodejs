import { Users } from "../src/migrations/users";
import { Diaries } from "../src/migrations/diaries";
import { exit } from "process";

const diaries = new Diaries().down();
const users = new Users().down();

Promise.all([diaries, users])
    .finally(() => {
        exit();
    })
