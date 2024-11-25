import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import productRouter from './app/modules/product/product.router';
import orderRouter from './app/modules/order/order.router';
import { error } from 'console';
import config from './app/config';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to book store!');
});




export default app;
