import express from "express";
import { ProductControllers } from "./product.controller";
const router = express.Router();

router.post("/add-product", ProductControllers.createProduct);

export const ProductRoutes = router;
