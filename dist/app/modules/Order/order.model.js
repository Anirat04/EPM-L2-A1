"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
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
exports.Order = (0, mongoose_1.model)("Order", OrderSchema);
