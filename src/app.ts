import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/Product/product.route";
import { OrderRoutes } from "./app/modules/Order/order.route";
const app: Application = express();

//PARSER
app.use(express.json());
app.use(cors());

// Application routes
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Developers!");
});

app.all("*", (req: Request, res: Response) => {
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

export default app;
