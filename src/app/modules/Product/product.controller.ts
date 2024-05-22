import { Request, Response } from "express";
import { ProductServices } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const ProductData = req.body;
    const result = await ProductServices.createProductIntoDB(ProductData);

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong!!",
      error,
    });
  }
};

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
          message: `No products found matching the search term '${searchTerm}'.`,
          data: null,
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

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Products fetched successfully by ID!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Something went wrong!",
      error,
    });
  }
};

//TODO: Meaningful response if the product is not exists
const updateProductInfo = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const productData = req.body;
    const result = await ProductServices.updateProductInfoFromDB(
      id,
      productData
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Something went wrong! Product couldn't updated",
      error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;

    // Check if the product exists
    const product = await ProductServices.getSingleProductFromDB(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with id ${id} not found.`,
        data: null,
      });
    }

    // Delete the product if it exists in the collection
    await ProductServices.deleteProductFromDB(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: "Something went wrong! Product couldn't updated",
      error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProductInfo,
  deleteProduct,
};
