import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import orderValidationSchema from "./order.zod.validation";
// import { ZodIssue } from "zod";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const parseData = orderValidationSchema.parse(orderData);
    const result = await OrderServices.createOrderIntoDB(parseData);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    let statusCode = 500;
    let responseMessage = "Order couldn't be completed";

    if (error instanceof Error && error.message === "Product not found") {
      statusCode = 404;
      responseMessage = "Product not found";
    } else if (
      error instanceof Error &&
      error.message === "Insufficient quantity available in inventory"
    ) {
      statusCode = 400;
      responseMessage = "Insufficient quantity available in inventory";
    }

    res.status(statusCode).json({
      success: false,
      message: responseMessage,
      error: (error as { issues: { message: string }[] })?.issues?.map(
        (item, index) => `${index + 1 + "." + item.message}`
      ),
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
          message: `Order not found`,
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
