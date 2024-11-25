import { Request, Response } from 'express';
import { orderService } from './order.service';
import Orders from './order.model';
import Products from '../product/product.model';
import config from '../../config';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity, totalPrice } = req.body;
    const orderProduct = await Products.findById(product);

    if (!orderProduct) {
      res.status(404).json({
        success: false,
        message: 'book are not found',
      });
      return;
    }
    if (quantity <= 0) {
      res.status(400).json({
        success: false,
        message: 'invalid input',
      });
    }
    if (orderProduct.quantity < quantity) {
      res.status(400).json({
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
      res.status(200).json({
        success: true,
        message: 'Order updated successfully',
        data: updatedOrder,
      });
    } else {
      const payload = { email, product, quantity, totalPrice };

      const newOrder = await orderService.createOrder(payload);

      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: newOrder,
      });
      return;
    }
  } catch (error) {
    res.json({
      success: false,
      message: 'validation Error',
      error,
      stack:
        config.node_env === 'development'
          ? new Error('Something went wrong').stack
          : undefined,
    });
  }
};

const allOrderRevenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const revenue = await Orders.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
    ]);

    const totalRevenue = revenue[0]?.totalRevenue;
    res.json({
      message: 'Revenue calculated successfully',
      success: true,
      data: { totalRevenue },
    });
  } catch (error) {
    res.json({
      message: 'Something went wrong',
      success: false,
      error,
      stack:
        config.node_env === 'development'
          ? new Error('Something went wrong').stack
          : undefined,
    });
  }
};
export const orderController = {
  createOrder,
  allOrderRevenue,
};
