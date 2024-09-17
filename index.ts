import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { ApiResponder } from './src/actions/ApiResponder';

dotenv.config();

const app: Express = express();
const port: string | undefined = process.env.APP_PORT;
const app_url: string = process.env.APP_URL || 'http://localhost';

app.get('/', (request: Request, response: Response) => {
    response.json(new ApiResponder(true, 'Welcome to Diary', null).toJson());
});

app.listen(port, () => {
    console.log("\x1b[32m", `⚡️[server]: Server is running at ${app_url}:${port}`);
});
