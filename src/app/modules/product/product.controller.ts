import { Request, Response } from 'express';
import { productService } from './product.service';
import { productValidationSchema } from './product.validation';
import config from '../../config';

// create a book
const createBook = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = await productService.createBook(payload);
    res.json({
      message: 'Book created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.json({
      message: 'ValidationError',
      success: false,
      error,
      stack:
        config.node_env === 'development'
          ? new Error('Something went wrong').stack
          : undefined,
    });
  }
};

// get all book and also by get search with category,tittle,author
const getAllBook = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;

    const result = await productService.getAllBook(searchTerm);

    if (result.length === 0) {
      res.status(404).json({
        message: 'No Books are found',
        success: false,
      });
      return;
    }

    res.status(200).json({
      message: 'Books retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.json({
      message: 'Resources Not Found',
      success: false,
      error,
    });
  }
};

// get single book by id
const getSingleBook = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;

    const result = await productService.getSingleBook(productId);
    if (!result) {
      res.status(404).json({
        message: 'Book not found',
        success: false,
      });
      return;
    }
    res.status(200).json({
      message: 'Books retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.json({
      message: 'Resources Not Found',
      success: false,
      error,
      stack:
        config.node_env === 'development'
          ? new Error('Something went wrong').stack
          : undefined,
    });
  }
};

// update a book
const updateBook = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const data = req.body;


    const result = await productService.updateBook(productId, data);
    res.status(200).json({
      message: 'Book updated successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.json({
      message: 'Validation Error',
      success: false,
      error,
      stack:
        config.node_env === 'development'
          ? new Error('Something went wrong').stack
          : undefined,
    });
  }
};

// delete a book
const deleteBook = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    await productService.deleteBook(productId);

    res.status(200).json({
      message: 'Book deleted successfully',
      success: true,
      data: {},
    });
  } catch (error) {
    res.json({
      message: 'Validation Error',
      success: false,
      error,
      stack:
        config.node_env === 'development'
          ? new Error('Something went wrong').stack
          : undefined,
    });
  }
};

export const productController = {
  createBook,
  getAllBook,
  getSingleBook,
  updateBook,
  deleteBook,
};
