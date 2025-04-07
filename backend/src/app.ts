import express, { Request, Response } from 'express';

import dotenv from 'dotenv';
import cors from 'cors';
import { JwtPayload } from 'jsonwebtoken';

import { CORS_ORIGIN, MONGO_URL } from './config/config.js';
import mongoose from 'mongoose';
import userRouter from './routers/user.router.js';
import authRouter from './routers/auth.router.js';
import { verifyToken } from './middlewares/authMiddleware.js';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const maxDuration = 300;

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

if (!MONGO_URL) {
  console.error('❌ No se ha definido la variable de entorno MONGO_URL');
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL as string);
  } catch (err) {
    console.error('Error de conexión a MongoDB:', err);
    setTimeout(connectDB, 5000); // Intentar reconectar cada 5 segundos
  }
};
connectDB();
app.get('/protected', verifyToken, (_req: Request, res: Response): void => {
  res.status(200).json({ message: 'You have access' });
  return;
});

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.use('*', (_req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada actualizado' });
});
export default app;
