import { Schema } from "mongoose";

export interface IOrder {
  email: string;
  product: Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
}
