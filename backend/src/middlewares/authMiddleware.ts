import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/config.js';
import { JwtPayload } from 'jsonwebtoken';

export function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
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
