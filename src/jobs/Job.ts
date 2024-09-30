import { Queue, QueueNames } from "../modules/queue";

export default class Job {
    public queue: QueueNames|undefined;

    public onQueue(queue: QueueNames): this {
        this.queue = queue;

        return this;
    }

    public getQueue(): QueueNames {
        return this.queue ?? QueueNames.default;
    }

    public async dispatch() {
        await Queue(this.getQueue()).add(this);
    }

    public handle(): void {}

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
