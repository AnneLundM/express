import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
} from "../../handlers/products/product.handler.js";

const productRoute = express.Router();

// Get all products
productRoute.get("/products", async (req, res) => {
  try {
    const result = await getProducts();

    return res.status(200).send({
      status: "ok",
      message: "Produkterne blev hentet!",
      data: result,
    });
  } catch (error) {
    console.error("Server-fejl:", error);
    return res.status(500).send({
      status: "error",
      message: "Server-fejl",
      error: error.message,
    });
  }
});

// Create
productRoute.post("/product", async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    if (!title) {
      return res.status(400).send({
        status: "error",
        message: "Produktet skal have en titel!",
      });
    }

    const product = { title, description, price, category };

    const result = await createProduct(product);

    return res.status(201).send({
      status: "Oprettet",
      message: "Produktet blev oprettet med success!",
      data: result,
    });
  } catch (error) {
    console.error("Server-fejl:", error);
    return res.status(500).send({
      status: "error",
      message: "Server-fejl",
      error: error.message,
    });
  }
});

// Delete
productRoute.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
      });
    }

    const result = await deleteProduct(id);

    return res.status(200).send(result);
  } catch {
    console.error("Der skete en fejl:", error);
  }
});

export default productRoute;
