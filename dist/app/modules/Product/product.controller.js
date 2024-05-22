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
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const product_zod_validation_1 = __importDefault(require("./product.zod.validation"));
const zod_1 = require("zod");
// 1. Create a New Product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ProductData = req.body;
        const parseData = product_zod_validation_1.default.parse(ProductData);
        const result = yield product_service_1.ProductServices.createProductIntoDB(parseData);
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                message: `Validation Failed`,
                error: error.errors.map((item, index) => `${index + 1}. ${item.message}`),
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: `Something Went Wrong!!`,
                error: error.message,
            });
        }
        // res.status(500).json({
        //   success: false,
        //   message: `Something Went Wrong!!`,
        //   error: error.issues.map(
        //     (item: any, index: number) => `${index + 1 + "." + item.message}`
        //   ),
        // });
    }
});
// 2. Retrieve a List of All Products & 6. Search a product
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result;
        const searchTerm = req.query.searchTerm;
        if (searchTerm) {
            // Perform search if searchTerm is provided
            result = yield product_service_1.ProductServices.searchProductsFromDB(searchTerm);
            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }
            res.status(200).json({
                success: true,
                message: `Products matching search term ${searchTerm} fetched successfully!`,
                data: result,
            });
        }
        else {
            // Fetch all products if no searchTerm is provided
            result = yield product_service_1.ProductServices.getAllProductsFromDB();
            res.status(200).json({
                success: true,
                message: "Products fetched successfully!",
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: "Something went wrong!",
            error,
        });
    }
});
// 3. Retrieve a Specific Product by ID
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield product_service_1.ProductServices.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        if (error instanceof Error && error.message === "Product not found") {
            res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Something went wrong!",
                error,
            });
        }
    }
});
// 4. Update Product Information
const updateProductInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const productData = req.body;
        const parseData = product_zod_validation_1.default.parse(productData);
        const result = yield product_service_1.ProductServices.updateProductInfoFromDB(id, parseData);
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result,
        });
    }
    catch (error) {
        if (error instanceof Error && error.message === "Product not found") {
            res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        else if (error instanceof zod_1.ZodError) {
            res.status(400).json({
                success: false,
                message: "Validation failed",
                error: error.issues.map((item, index) => `${index + 1 + "." + item.message}`),
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Something went wrong! Couldn't fetch the product",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }
});
// 5. Delete a Product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        yield product_service_1.ProductServices.deleteProductFromDB(id);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
        });
    }
    catch (error) {
        if (error instanceof Error && error.message === "Product not found") {
            res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Something went wrong! Couldn't update the product",
                error,
            });
        }
    }
});
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProductInfo,
    deleteProduct,
};
