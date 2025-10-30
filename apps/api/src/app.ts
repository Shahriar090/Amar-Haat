import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Application, type Request, type Response } from 'express';
const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (_req: Request, res: Response) => {
	res.send('Hello from amar-haat server.!');
});

export default app

