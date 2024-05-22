import { ProductServices } from "../Product/product.service";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderIntoDB = async (orderData: TOrder) => {
  const productId = orderData.productId;
  // Fetch the matched product
  const matchedProduct = await ProductServices.getSingleProductFromDB(
    productId
  );
  // Check if the product exists
  if (!matchedProduct) {
    throw new Error("Product not found");
  }
  // Check if the product is in stock and has sufficient quantity
  if (
    matchedProduct.inventory.quantity < orderData.quantity ||
    matchedProduct.inventory.quantity === 0
  ) {
    throw new Error("Insufficient quantity available in inventory");
  }

  // Deduct the ordered quantity from the product's inventory
  matchedProduct.inventory.quantity -= orderData.quantity;
  // Update the inStock status based on the new quantity
  matchedProduct.inventory.inStock = matchedProduct.inventory.quantity > 0;

  await ProductServices.updateProductInfoFromDB(productId, matchedProduct);

  const order = new Order(orderData);
  const result = await order.save();
  return result;
};

const getAllOrdersFromDB = async () => {
  const result = await Order.find();
  return result;
};

const getOrdersByEmailFromDB = async (email: string) => {
  const result = await Order.find({ email });
  //   .lean();
  // .select("-__v -_id -variants._id");
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getOrdersByEmailFromDB,
};
