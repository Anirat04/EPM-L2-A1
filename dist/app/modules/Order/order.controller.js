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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const order_service_1 = require("./order.service");
const order_zod_validation_1 = __importDefault(require("./order.zod.validation"));
// import { ZodIssue } from "zod";
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const orderData = req.body;
        const parseData = order_zod_validation_1.default.parse(orderData);
        const result = yield order_service_1.OrderServices.createOrderIntoDB(parseData);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (error) {
        let statusCode = 500;
        let responseMessage = "Order couldn't be completed";
        if (error instanceof Error && error.message === "Product not found") {
            statusCode = 404;
            responseMessage = "Product not found";
        }
        else if (error instanceof Error &&
            error.message === "Insufficient quantity available in inventory") {
            statusCode = 400;
            responseMessage = "Insufficient quantity available in inventory";
        }
        res.status(statusCode).json({
            success: false,
            message: responseMessage,
            error: (_a = error === null || error === void 0 ? void 0 : error.issues) === null || _a === void 0 ? void 0 : _a.map((item, index) => `${index + 1 + "." + item.message}`),
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result;
        const email = req.query.email;
        if (email) {
            result = yield order_service_1.OrderServices.getOrdersByEmailFromDB(email);
            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: `Order not found`,
                });
            }
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully for user email!",
                result,
            });
        }
        else {
            result = yield order_service_1.OrderServices.getAllOrdersFromDB();
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Orders couldn't fetched successfully!",
            error,
        });
    }
});
exports.OrderControllers = {
    createOrder,
    getAllOrders,
};
