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
  // const result = await Product.find();
  // return result;
  const result = await Product.find().lean().select("-__v -_id -variants._id");
  return result;
};

// 6. Search a product
const searchProductsFromDB = async (searchTerm: string) => {
  const result = await Product.find({
    $or: [
      { name: { $regex: searchTerm } },
      { description: { $regex: searchTerm } },
      { tags: { $in: [searchTerm] } },
      { category: { $regex: searchTerm } },
    ],
  })
    .lean()
    .select("-__v -_id -variants._id");
  return result;
};
////////////////

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
const updateProductInfoFromDB = async (id: string, productData: TProduct) => {
  //   const result = await Product.findByIdAndUpdate(id, productData, {
  //     new: true,
  //     runValidators: true,
  //   });
  const result = await Product.findByIdAndUpdate(id, productData).lean();
  return result;
};

// 5. Delete a Product
const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductInfoFromDB,
  deleteProductFromDB,
  searchProductsFromDB,
};
