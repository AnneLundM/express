import * as productModel from "../../models/products/product.model.js";

// Get all products
export const getProducts = async () => {
  try {
    const products = await productModel.find({});
    return products;
  } catch (error) {
    throw new Error("Der skete en fejl:", error);
  }
};

// Create
export const createProduct = async (body) => {
  try {
    const product = await productModel.create(body);
    return product;
  } catch (error) {
    console.error("Der skete en fejl:", error);
    throw new Error("Der skete en fejl:", error); // Throw: Stop alt og smid fejlen videre til route
  }
};

// Delete
export const deleteProduct = async (id) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return {
        status: "Produkt ikke fundet!",
      };
    }

    return {
      status: "ok",
      message: "Produktet er slettet!",
    };
  } catch (error) {
    return {
      status: "error",
    };
  }
};
