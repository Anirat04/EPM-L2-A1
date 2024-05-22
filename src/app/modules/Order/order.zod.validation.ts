import { z } from "zod";

const orderValidationSchema = z.object({
  email: z
    .string({
      required_error: "User email is required",
    })
    .email({ message: "Email is required, please enter a valid email" }),
  productId: z
    .string({
      required_error: "Product id is required",
      invalid_type_error: "Product id must be a string",
    })
    .min(1, "Product id is required"),
  price: z.number({
    required_error: "Price is required",
    invalid_type_error: "Price must be a number",
  }),
  quantity: z.number({
    required_error: "Quantity is required",
    invalid_type_error: "Quantity must be a number",
  }),
});

export default orderValidationSchema;
