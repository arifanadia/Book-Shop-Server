import { Request, Response } from 'express';
import { orderService } from './order.service';
import Orders from './order.model';
import Products from '../product/product.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity, totalPrice } = req.body;
    const orderProduct = await Products.findById(product);
    if (!orderProduct) {
      return res.status(404).json({
        success: false,
        message: 'book are not found',
      });
    }

    if (orderProduct.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock for the order',
      });
    }
    orderService.updateProductStock(product, quantity, orderProduct);
    const existingOrder = await orderService.existingOrder(email, product);

    if (existingOrder) {
      existingOrder.quantity += quantity;
      existingOrder.totalPrice += totalPrice;

      const updatedOrder = await existingOrder.save();
      return res.status(200).json({
        success: true,
        message: 'Order updated successfully',
        data: updatedOrder,
      });
    } else {
      const payload = { email, product, quantity, totalPrice };

      const newOrder = await orderService.createOrder(payload);

      return res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: newOrder,
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: 'validation Error',
      error,
    });
  }
};

const allOrderRevenue = async (req: Response, res: Response) => {
  try {
    
  } catch (error) {
    res.json({
      message: 'Something went wrong',
      success: false,
      error,
    });
  }
};
export const orderController = {
  createOrder,
  allOrderRevenue,
};
