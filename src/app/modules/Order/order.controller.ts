import { Request, Response } from "express";
import { OrderServices } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const result = await OrderServices.createOrderIntoDB(orderData);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error: any) {
    let statusCode = 500;
    let responseMessage = "Order couldn't be completed";

    if (error.message === "Product not found") {
      statusCode = 404;
      responseMessage = "Product not found";
    } else if (
      error.message === "Insufficient quantity available in inventory"
    ) {
      statusCode = 400;
      responseMessage = "Insufficient quantity available in inventory";
    }

    res.status(statusCode).json({
      success: false,
      message: responseMessage,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    let result;
    const email = req.query.email as string;

    if (email) {
      result = await OrderServices.getOrdersByEmailFromDB(email);
      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: `No order found of email: '${email}'.`,
          data: null,
        });
      }
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully for user email!",
        result,
      });
    } else {
      result = await OrderServices.getAllOrdersFromDB();
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Orders couldn't fetched successfully!",
      error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
