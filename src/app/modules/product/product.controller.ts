import { Request, Response } from 'express';
import Products from './product.model';

const createBook = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = await Products.create(payload);
    res.json({
      message: 'Book created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.json({
        message:"Resource not found",
        success:false,
        error,
    })
  }
};

export const productController = {
  createBook,
};
