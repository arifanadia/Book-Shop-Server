import { IProduct } from './product.interface';
import Products from './product.model';

const createBook = async (payload: IProduct): Promise<IProduct> => {
  const result = await Products.create(payload);
  return result;
};

const getAllBook = async (searchTerm?: string): Promise<IProduct[]> => {
  let filter = {};

  if (searchTerm) {
    const searchRegex = new RegExp(searchTerm, 'i');
    console.log(searchRegex);
    filter = {
      $or: [
        { title: searchRegex },
        { author: searchRegex },
        { category: searchRegex },
      ],
    };
  }

  const result = await Products.find(filter);
  return result;
};

const getSingleBook = async (productId: string) => {
  const result = await Products.findById(productId);
  return result;
};
const updateBook = async (productId: string, data: IProduct) => {
  const result = await Products.findByIdAndUpdate(productId, data, {
    new: true,
  });
  return result;
};
const deleteBook = async (productId: string) => {
  const result = await Products.findByIdAndDelete(productId);
  return result;
};

export const productService = {
  createBook,
  getAllBook,
  getSingleBook,
  updateBook,
  deleteBook,
};
