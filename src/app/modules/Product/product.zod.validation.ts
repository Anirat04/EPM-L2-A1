import { z } from "zod";

// Define the variants schema separately
const variantValidationSchema = z.object({
  type: z
    .string({
      required_error:
        "Type of variant is required, please enter type of variant",
      invalid_type_error:
        "Type of variant is must be a string, please enter a string",
    })
    .min(1, "Variant type is required"),
  value: z
    .string({
      required_error: "Variant value is required, please enter a value",
      invalid_type_error: "Value of variant is must be a string",
    })
    .min(1, "Variant value is required"),
});

// Define the inventory schema separately
const inventoryValidationSchema = z.object(
  {
    quantity: z
      .number({
        required_error: "Quantity is required",
        invalid_type_error: "Quantity is must be a number",
      })
      .nonnegative("Quantity must be a non-negative number")
      .min(0, "Quantity is required"),
    inStock: z.boolean({
      required_error: "inStock is required",
      invalid_type_error: "inStock must be a boolean",
    }),
  },
  { required_error: "Inventory is required" }
);

// Define the main product schema
const productValidationSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, "Name is required"),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .min(1, "Description is required"),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .nonnegative("Price must be a non-negative number")
    .min(0, "Price is required"),
  category: z
    .string({
      required_error: "Category is required",
      invalid_type_error: "Category must be a string",
    })
    .min(1, "Category is required"),
  tags: z
    .array(
      z.string({
        invalid_type_error: "A tag must be a string",
      }),
      { required_error: "Tag is required" }
    )
    .nonempty("Tags are required"),
  variants: z
    .array(variantValidationSchema, { required_error: "Variants is required" })
    .nonempty("Variants are required"),
  inventory: inventoryValidationSchema,
});
export default productValidationSchema;
