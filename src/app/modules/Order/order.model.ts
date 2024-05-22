import { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";

const OrderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: [true, "Email is required, please enter a valid email"],
  },
  productId: {
    type: String,
    required: [true, "Product is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
});

export const Order = model<TOrder>("Order", OrderSchema);
