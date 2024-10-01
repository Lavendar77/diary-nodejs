import { CronCommand } from "../../interfaces/CronCommand";
import Job from "../../jobs/Job";
import { Queue } from "../../modules/queue";

export default class Inspire extends Job implements CronCommand {
    minute: any = '*';
    hour: any = '*';
    day_of_month: any = '*';
    month: any = '*';
    day_of_week: any = '*';

    public async dispatch() {
        await Queue(this.queue).add(this, {
            delay: this.delay,
            // repeat: {
            //     cron: `${this.minute} ${this.hour} ${this.day_of_month} ${this.month} ${this.day_of_week}`,
            // }
        },);
    }

    handle(): void {
        console.log(`When there is life, there is hope!`)
    }
}
