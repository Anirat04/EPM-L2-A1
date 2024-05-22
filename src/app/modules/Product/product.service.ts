import { TProduct } from "./product.interface";
import { Product } from "./product.model";

// 1. Create a New Product
const createProductIntoDB = async (productData: TProduct) => {
  const product = new Product(productData);
  const result = await product.save();
  return result;
};

// 2. Retrieve a List of All Products
const getAllProductsFromDB = async () => {
  //   const result = await Product.find();
  //   return result;
  const result = await Product.find().lean().select("-__v -_id -variants._id");
  return result;
};

// 3. Retrieve a Specific Product by ID
const getSingleProductFromDB = async (productId: string) => {
  //   const result = await Product.findById(productId);
  //   return result;
  const result = await Product.findById(productId)
    .lean()
    .select("-__v -_id -variants._id");
  return result;
};

// 4. Update Product Information
const updateProductInfoFromBD = async (id: string, productData: TProduct) => {
  //   const result = await Product.findByIdAndUpdate(id, productData, {
  //     new: true,
  //     runValidators: true,
  //   });
  const result = await Product.findByIdAndUpdate(id, productData);
  return result;
};
// 5. Delete a Product
// 6. Search a product

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductInfoFromBD,
};
