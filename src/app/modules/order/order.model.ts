import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';
import Products from '../product/product.model';

const orderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: true,

    },
    product: {
      type: String,
      ref: 'Products',
      required: [true, 'Product is required'],
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);


  
const Orders = model<IOrder>('Orders', orderSchema);
export default Orders;
