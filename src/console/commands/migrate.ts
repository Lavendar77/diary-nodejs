import { _Database } from "../../migrations/_database";
import { Users } from "../../migrations/users";
import { Diaries } from "../../migrations/diaries";
import { exit } from "process";

const database = new _Database();
const users = new Users();
const diaries = new Diaries();

database.up()
    .then(() => {
        users.up()
            .then(() => diaries.up())
            .then(() => {
                exit();
            })
    })
