import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import { JWT_SECRET_KEY, CORS_ORIGIN } from './config/config.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: CORS_ORIGIN,
  })
);

const user = {
  name: 'John Doe',
  age: 30,
  address: '123 Main St',
};

const SECRET_KEY = JWT_SECRET_KEY;

const token = jwt.sign(user, SECRET_KEY, {
  expiresIn: '1h',
});

app.get('/', (_req: Request, res: Response) => {
  res.send(token);
});

app.post('/login', (_req: Request, res: Response) => {
  res.json({ user: 'Felipe' });
});

app.post('/register', (_req: Request, _res: Response) => {});

app.post('/logout', (_req: Request, _res: Response) => {});

app.get('/protected', (_req: Request, _res: Response) => {});

export default app;
