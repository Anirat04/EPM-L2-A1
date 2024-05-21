import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (productData: TProduct) => {
  const product = new Product(productData);
  const result = await product.save();
  return result;
};

const getAllProductsFromDB = async () => {
  //   const result = await Product.find();
  //   return result;
  const result = await Product.find().lean().select("-__v").select("-_id");
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
};
