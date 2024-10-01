import { exit } from "process";
import { CronCommand } from "../interfaces/CronCommand";
import Job from "../jobs/Job";
import Inspire from "./commands/inspire";

type JobAndCronCommand = Job & CronCommand;

class Kernel {
    public commands: JobAndCronCommand[] = [
        new Inspire,
    ];

    public async handle() {
        return this.commands.forEach(async command => {
            await command.dispatch();
        });
    }
}

new Kernel().handle().then(exit()).catch(console.error);
