import dbConnect from "../../dbConnect.js";
import { deleteProductImage } from "../file.handler.js";
import productModel from "../../models/products/product.model.js";

// Get all products
export const getProducts = async () => {
  try {
    await dbConnect();
    const products = await productModel.find({});
    return products;
  } catch (error) {
    throw new Error("Der skete en fejl:", error);
  }
};

// Create
export const createProduct = async (body) => {
  try {
    await dbConnect();
    const product = await productModel.create(body);
    return product;
  } catch (error) {
    console.error("Der skete en fejl:", error);
    throw new Error("Der skete en fejl:", error); // Throw: Stop alt og smid fejlen videre til route
  }
};

// Update
export const updateProduct = async (body) => {
  try {
    await dbConnect();
    const product = await productModel.findById(body.id);

    if (!product) {
      return {
        status: "error",
        message: "Produkt ikke fundet",
        data: [],
      };
    }

    if (product.image && body.image) {
      await deleteProductImage(product.image);
    }

    const { id, ...updateData } = body;

    const updatedProduct = await productModel.findByIdAndUpdate(id, updateData);

    return updatedProduct;
  } catch (error) {
    throw new Error("Opdatering af produktet fejlede: " + error.message);
  }
};

// Delete
export const deleteProduct = async (id) => {
  try {
    await dbConnect();
    const product = await productModel.findById(id);

    if (!product) {
      return {
        status: "error",
        message: "Produkt ikke fundet",
        data: [],
      };
    }
    if (product.image) {
      await deleteProductImage(product.image);
    }
    const deletedProduct = await productModel.findByIdAndDelete(id);
    return deletedProduct;
  } catch (error) {
    throw new Error("Der skete en fejl under sletning af produkt:", error);
  }
};

// Get by ID
export const getProductById = async (id) => {
  try {
    await dbConnect();
    const product = await productModel.findById(id);
    return product;
  } catch (error) {
    throw new Error("Der skete en fejl:", error);
  }
};
