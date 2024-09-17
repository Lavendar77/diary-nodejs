import { Users } from "../migrations/users";
import { Diaries } from "../migrations/diaries";
import { exit } from "process";

const diaries = new Diaries();
const users = new Users();

diaries.down()
    .then(() => users.down())
    .then(() => {
        exit();
    })
