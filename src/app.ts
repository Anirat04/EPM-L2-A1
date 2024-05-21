import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/Product/product.route";
const app: Application = express();

//PARSER
app.use(express.json());
app.use(cors());

// Application routes
app.use("/api/products", ProductRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Developers!");
});

export default app;
