import express from "express";
import { ProductControllers } from "./product.controller";
const router = express.Router();

router.post("/add-product", ProductControllers.createProduct);
router.get("/", ProductControllers.getAllProducts);
router.get("/:productId", ProductControllers.getSingleProduct);
router.put("/:productId", ProductControllers.updateProductInfo);
router.delete("/:productId", ProductControllers.deleteProduct);

export const ProductRoutes = router;
