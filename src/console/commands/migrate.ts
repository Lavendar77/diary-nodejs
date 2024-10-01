import { Users } from "../../migrations/users";
import { Diaries } from "../../migrations/diaries";
import { exit } from "process";

const users = new Users();
const diaries = new Diaries();

users.up()
    .then(() => diaries.up())
    .then(() => {
        exit();
    })
