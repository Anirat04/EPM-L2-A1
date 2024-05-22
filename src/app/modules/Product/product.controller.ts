import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import productValidationSchema from "./product.zod.validation";

// 1. Create a New Product
const createProduct = async (req: Request, res: Response) => {
  try {
    const ProductData = req.body;
    const parseData = productValidationSchema.parse(ProductData);
    const result = await ProductServices.createProductIntoDB(parseData);

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Something Went Wrong!!`,
      error: error.issues.map(
        (item: any, index: number) => `${index + 1 + "." + item.message}`
      ),
    });
  }
};

// 2. Retrieve a List of All Products & 6. Search a product
const getAllProducts = async (req: Request, res: Response) => {
  try {
    let result;
    const searchTerm = req.query.searchTerm as string;

    if (searchTerm) {
      // Perform search if searchTerm is provided
      result = await ProductServices.searchProductsFromDB(searchTerm);
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
    } else {
      // Fetch all products if no searchTerm is provided
      result = await ProductServices.getAllProductsFromDB();
      res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Something went wrong!",
      error,
    });
  }
};

// 3. Retrieve a Specific Product by ID
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    if (error.message === "Product not found") {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Something went wrong!",
        error,
      });
    }
  }
};

// 4. Update Product Information
const updateProductInfo = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const productData = req.body;

    const parseData = productValidationSchema.parse(productData);
    const result = await ProductServices.updateProductInfoFromDB(id, parseData);

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error: any) {
    if (error.message === "Product not found") {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Something went wrong! Couldn't update the product",
        error: error.issues.map(
          (item: any, index: number) => `${index + 1 + "." + item.message}`
        ),
      });
    }
  }
};

// 5. Delete a Product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    await ProductServices.deleteProductFromDB(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (error: any) {
    if (error.message === "Product not found") {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Something went wrong! Couldn't update the product",
        error,
      });
    }
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProductInfo,
  deleteProduct,
};
