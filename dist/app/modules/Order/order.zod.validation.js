"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: "User email is required",
    })
        .email({ message: "Email is required, please enter a valid email" }),
    productId: zod_1.z
        .string({
        required_error: "Product id is required",
        invalid_type_error: "Product id must be a string",
    })
        .min(1, "Product id is required"),
    price: zod_1.z.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
    }),
    quantity: zod_1.z.number({
        required_error: "Quantity is required",
        invalid_type_error: "Quantity must be a number",
    }),
});
exports.default = orderValidationSchema;
