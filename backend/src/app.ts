import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json());

const data = {
  name: 'John Doe',
  age: 30,
  address: '123 Main St',
};

app.get('/', (_req: Request, res: Response) => {
  res.json(data);
});

export default app;
