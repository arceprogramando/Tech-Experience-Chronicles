import express, { NextFunction, Request, Response } from 'express';

import dotenv from 'dotenv';
import cors from 'cors';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_SECRET_KEY, CORS_ORIGIN } from './config/config.js';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: CORS_ORIGIN,
  })
);

app.post('/login', (req: Request, res: Response): void => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required' });
      return;
    }
    if (username === 'admin' && password === '123') {
      const token = jwt.sign({ username }, JWT_SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ token });
      return;
    } else {
      res.status(401).json({ message: 'Authentication failed' });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
});

function verifyToken(req: Request, res: Response, next: NextFunction): void {
  const header = req.header('Authorization') || '';
  const token = header.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Token not provided' });
    return;
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY);

    if (typeof payload === 'string') {
      res.status(403).json({ message: 'Invalid token format' });
      return;
    }

    req.user = payload as JwtPayload;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token not valid' });
    return;
  }
}

app.get('/protected', verifyToken, (_req: Request, res: Response): void => {
  res.status(200).json({ message: 'You have access' });
  return;
});

export default app;
