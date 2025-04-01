import { Request, Response } from 'express';
import UserModel from '../models/user.models.js';

class UserController {
  static async getAllUsers(_req: Request, res: Response): Promise<void> {
    try {
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  static async deleteUser(_req: Request, res: Response): Promise<void> {
    try {
      const { id } = _req.params;

      if (!id) {
        res.status(400).json({ message: 'User ID is required' });
        return;
      }

      const user = await UserModel.findByIdAndDelete(id);

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

export default UserController;
