import dotenv from "dotenv";
import Bull from "bull";

dotenv.config();

const port: number = Number(process.env.REDIS_PORT) || 6379;
const host: string = process.env.REDIS_HOST || 'localhost';

export enum QueueNames {
    default
};

export const Queue = (name: QueueNames) => {
    return new Bull(name.toString(), {
        redis: {
            port: port,
            host: host
        }
    });
};
