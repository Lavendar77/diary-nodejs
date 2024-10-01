import { Queue, QueueNames } from "../modules/queue";

export default abstract class Job {
    public queue: QueueNames = QueueNames.default;

    public delay: number = 0;

    abstract handle(): void;

    public onQueue(queue: QueueNames): this {
        this.queue = queue;

        return this;
    }

    public onDelay(milliseconds: number): this {
        this.delay = milliseconds;

        return this;
    }

    public async dispatch() {
        await Queue(this.queue).add(this, {
            delay: this.delay,
        });
    }

    toJSON() {
        const classProperties = Object.entries(this)
            .reduce((acc: any, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});

        return {
            __class_name: this.constructor.name,
            arguments: classProperties,
        };
    }
}
