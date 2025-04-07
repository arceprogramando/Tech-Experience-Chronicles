import { Request, Response } from 'express';
import UserModel from '../models/user.models.js';
import argon2 from 'argon2';
import { JWT_SECRET_KEY } from '../config/config.js';
import jwt from 'jsonwebtoken';

class AuthController {
  static async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email) {
        res.status(400).json({ message: 'Email is required' });
        return;
      }

      if (!password) {
        res.status(400).json({ message: 'Password is required' });
        return;
      }

      if (password.length < 12) {
        res
          .status(400)
          .json({ message: 'Password must be at least 12 characters' });
        return;
      }

      const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

      if (!regexPassword.test(password)) {
        res.status(400).json({
          message:
            'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        });
        return;
      }

      const hashedPassword = await argon2.hash(password);

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        res.status(409).json({ message: 'the user already exists' });
        return;
      }

      await UserModel.create({
        email,
        password: hashedPassword,
      });

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  static async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!password) {
        res.status(400).json({ message: 'Password is required' });
        return;
      }
      if (!email) {
        res.status(400).json({ message: 'Email is required' });
        return;
      }

      const findUser = await UserModel.findOne({ email });
      if (!findUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      console.log('🚀 ~ AuthController ~ loginUser ~ findUser:', findUser);

      const validPassword = await argon2.verify(findUser.password, password);
      console.log(
        '🚀 ~ AuthController ~ loginUser ~ validPassword:',
        validPassword
      );
      if (!validPassword) {
        res.status(401).json({ message: 'Invalid password' });
        return;
      }

      const token = jwt.sign({ email }, JWT_SECRET_KEY, { expiresIn: '1h' });

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 3600000,
      });

      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

export default AuthController;
