import { Request, Response } from 'express';
import Tour from '../models/Tour';

export const getAllTours = async (req: Request, res: Response) => {
  try {
    const tours = await Tour.find().limit(6);
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
