import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderIntoDB = async (orderData: TOrder) => {
  const order = new Order(orderData);
  const result = await order.save();
  return result;
};

const getAllOrdersFromDB = async () => {
  const result = await Order.find();
  return result;
};

const getOrdersByEmailFromDB = async (email: string) => {
  const result = await Order.find({ email }).lean();
  // .select("-__v -_id -variants._id");
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getOrdersByEmailFromDB,
};
