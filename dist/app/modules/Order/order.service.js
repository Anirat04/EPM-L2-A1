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
exports.OrderServices = void 0;
const product_service_1 = require("../Product/product.service");
const order_model_1 = require("./order.model");
const createOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = orderData.productId;
    // Fetch the matched product
    const matchedProduct = yield product_service_1.ProductServices.getSingleProductFromDB(productId);
    // Check if the product exists
    if (!matchedProduct) {
        throw new Error("Product not found");
    }
    // Check if the product is in stock and has sufficient quantity
    if (matchedProduct.inventory.quantity < orderData.quantity ||
        matchedProduct.inventory.quantity === 0) {
        throw new Error("Insufficient quantity available in inventory");
    }
    // Deduct the ordered quantity from the product's inventory
    matchedProduct.inventory.quantity -= orderData.quantity;
    // Update the inStock status based on the new quantity
    matchedProduct.inventory.inStock = matchedProduct.inventory.quantity > 0;
    yield product_service_1.ProductServices.updateProductInfoFromDB(productId, matchedProduct);
    const order = new order_model_1.Order(orderData);
    const result = yield order.save();
    return result;
});
const getAllOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find();
    return result;
});
const getOrdersByEmailFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find({ email });
    //   .lean();
    // .select("-__v -_id -variants._id");
    return result;
});
exports.OrderServices = {
    createOrderIntoDB,
    getAllOrdersFromDB,
    getOrdersByEmailFromDB,
};
