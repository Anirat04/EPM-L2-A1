"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
// 1. Create a New Product
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new product_model_1.Product(productData);
    const result = yield product.save();
    return result;
});
// 2. Retrieve a List of All Products
const getAllProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find();
    return result;
    // const result = await Product.find().lean().select("-__v -_id -variants._id");
    // return result;
});
// 6. Search a product
const searchProductsFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find({
        $or: [
            { name: { $regex: searchTerm } },
            { description: { $regex: searchTerm } },
            { tags: { $in: [searchTerm] } },
            { category: { $regex: searchTerm } },
        ],
    });
    // .lean()
    // .select("-__v -_id -variants._id");
    return result;
});
////////////////
// 3. Retrieve a Specific Product by ID
const getSingleProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(productId);
    if (!result) {
        throw new Error("Product not found");
    }
    return result;
    // const result = await Product.findById(productId)
    //   .lean()
    //   .select("-__v -_id -variants._id");
    // return result;
});
// 4. Update Product Information
const updateProductInfoFromDB = (id, productData) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the product exists
    const existingProduct = yield product_model_1.Product.findById(id);
    if (!existingProduct) {
        throw new Error("Product not found");
    }
    const result = yield product_model_1.Product.findByIdAndUpdate(id, productData, {
        new: true,
        runValidators: true,
    });
    // const result = await Product.findByIdAndUpdate(id, productData).lean();
    return result;
});
// 5. Delete a Product
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingProduct = yield product_model_1.Product.findById(id);
    if (!existingProduct) {
        throw new Error("Product not found");
    }
    const result = yield product_model_1.Product.findByIdAndDelete(id);
    return result;
});
exports.ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateProductInfoFromDB,
    deleteProductFromDB,
    searchProductsFromDB,
};
