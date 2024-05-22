"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/modules/Product/product.route");
const order_route_1 = require("./app/modules/Order/order.route");
const app = (0, express_1.default)();
//PARSER
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Application routes
app.use("/api/products", product_route_1.ProductRoutes);
app.use("/api/orders", order_route_1.OrderRoutes);
app.get("/", (req, res) => {
    res.send("Hello Developers!");
});
app.all("*", (req, res) => {
    res.status(400).json({
        success: false,
        message: "Route not found",
    });
});
// global error handler
// app.use((error: any, req: Request, res: Response, next: NextFunction) => {
//   if (error) {
//     res.status(400).json({
//       success: false,
//       message: "Route not found",
//     });
//   }
// });
exports.default = app;
