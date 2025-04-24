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

// Update
export const updateProduct = async (body) => {
  try {
    const product = await productModel.findById(body.id);

    if (!product) {
      throw new Error("Produkt ikke fundet", error);
    }

    // Henter id - resten bliver lagt i et nyt objekt vi kalder updatedData
    const { id, ...updatedData } = body;

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      updatedData
    );
    return updatedProduct;
  } catch (error) {
    throw new Error("Opdatering af produktet fejlede:", error);
  }
};

// Delete
export const deleteProduct = async (id) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(id);
    return deletedProduct;
  } catch (error) {
    throw new Error("Der skete en fejl under sletning af produkt:", error);
  }
};

// Get by ID
export const getProductById = async (id) => {
  try {
    const product = await productModel.findById(id);
    return product;
  } catch (error) {
    throw new Error("Der skete en fejl:", error);
  }
};
