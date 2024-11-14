import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string({ message: "Product name must be a string" })
    .min(4, { message: "Product name must be at least 4 characters" })
    .max(20, { message: "Product name must be at most 12 characters" }),
  image: z.instanceof(File, { message: "product image must be a file" }),
  description: z
    .string({ message: "product description must be a string" })
    .min(4, { message: "Product description must be at least 4 characters" })
    .max(100, { message: "Product description must be at most 100 characters" }),
  price: z
    .number({ message: "product price must be a number" })
    .min(1, { message: "Product price must be at least 1" }),
});
