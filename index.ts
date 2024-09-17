import dotenv from 'dotenv';
import express, { Express } from 'express';
import indexRouter from './src/routes/index';
import apiRouter from './src/routes/api';
import errorRouter from './src/routes/error';

dotenv.config();

const app: Express = express();
const port: string | number = process.env.APP_PORT || 8080;
const app_url: string = process.env.APP_URL || 'http://localhost';

app.use(express.json());

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('*', errorRouter);

app.listen(port, () => {
    console.log("\x1b[32m", `⚡️[server]: Server is running at ${app_url}:${port}`);
});
