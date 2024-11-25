import { IProduct } from '../product/product.interface';
import Products from '../product/product.model';
import { IOrder } from './order.interface';
import Orders from './order.model';

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const result = await Orders.create(payload);
  return result;
};

const existingOrder = async (email: string, product: string) => {
  const existingOrder = await Orders.findOne({ email, product });
  return existingOrder;
};
const updateProductStock = async (
  productId: string,
  quantity: number,
  orderProduct: IProduct,
) => {
  orderProduct.quantity -= quantity;

  if (orderProduct.quantity <= 0) {
    orderProduct.inStock = false;
  }

  await Products.updateOne(
    { _id: productId },
    {
      $set: {
        quantity: orderProduct.quantity,
        inStock: orderProduct.inStock,
      },
    },
  );
};

export const orderService = {
  createOrder,
  existingOrder,
  updateProductStock,
};
