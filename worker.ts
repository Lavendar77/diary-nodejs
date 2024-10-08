import Bull from "bull";
import dotenv from "dotenv";
import { QueueNames } from "./src/modules/queue";
import { UserLoggedIn } from "./src/jobs/UserLoggedIn";
import Job from "./src/jobs/Job";
import Inspire from "./src/console/commands/inspire";

dotenv.config();

const port: number = Number(process.env.REDIS_PORT) || 6379;
const host: string = process.env.REDIS_HOST || 'localhost';

const classMap: { [key: string]: any } = {
    UserLoggedIn,
    Inspire,
};

const queue = new Bull(QueueNames.default.toString());
queue.process(async (job) => {
    const process: Job = new classMap[job.data.__class_name](job.data.arguments);
    process.handle();
});

console.log("\x1b[36m", `⚡️[queue]: Worker is running at ${host}:${port}`);
