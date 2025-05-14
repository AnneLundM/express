import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../../handlers/products/product.handler.js";
import multer from "multer";
import auth from "../../middleware/auth.middleware.js";

const productRoute = express.Router();

/* Konfiguration til fil-upload med multer:
Her definerer vi, hvor og hvordan uploadede filer skal gemmes.
`destination` angiver mappen hvor filerne skal placeres (uploads/products).
`filename` bestemmer navnet på filerne – her bruger vi tidspunktet (Date.now())
kombineret med det oprindelige filnavn, så vi undgår at overskrive filer. */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Get all products
productRoute.get("/products", async (req, res) => {
  try {
    const result = await getProducts();

    return res.status(200).send({
      status: "ok",
      message: "Produkterne blev hentet!",
      data: result,
      statusCode: 200,
    });
  } catch (error) {
    console.error("Server-fejl:", error);
    return res.status(500).send({
      status: "error",
      message: "Server-fejl",
      error: error.message,
      statusCode: 500,
    });
  }
});

// Create
productRoute.post(
  "/product",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, description, price, category, image } = req.body;

      if (!title) {
        return res.status(400).send({
          status: "error",
          message: "Produktet skal have en titel!",
        });
      }

      const product = { title, description, price, category, image };

      // req.file bliver automatisk tilføjet af multer
      if (req.file) {
        product.image =
          process.env.SERVER_HOST + "/uploads/products/" + req.file.filename;
      }

      const result = await createProduct(product);

      return res.status(201).send({
        status: "ok",
        message: "Produktet blev oprettet med success!",
        data: result,
        statusCode: 201,
      });
    } catch (error) {
      console.error("Server-fejl:", error);
      return res.status(500).send({
        status: "error",
        message: "Server-fejl",
        error: error.message,
        statusCode: 500,
      });
    }
  }
);

// Update
productRoute.put("/product", auth, upload.single("image"), async (req, res) => {
  try {
    const { id, title, description, price, category } = req.body;

    if (!id) {
      return res.status(400).send({
        status: "error",
        product: "Product ID mangler!",
        data: [],
      });
    }

    // Tjekker, om en eller flere af variablerne er undefined eller tomme
    if (!title || !description || !price || !category) {
      return res.status(400).send({
        status: "error",
        message:
          "Produktet mangler title, description, price og/eller category",
        data: [],
      });
    }

    // Saml produktdata i et objekt
    const productData = { id, title, description, price, category };

    // Hvis der er uploadet en ny fil, skal den med i produktData
    if (req.file) {
      const imageUrl = `${process.env.SERVER_HOST}/uploads/products/${req.file.filename}`;
      productData.image = imageUrl;
    }

    // Send det videre som argument til handler
    const result = await updateProduct(productData);

    return res.status(200).send({
      status: "ok",
      message: "Produkt opdateret!",
      data: result,
      statusCode: 200,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
      statusCode: 500,
    });
  }
});

// Delete
productRoute.delete("/product/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Produkt ID mangler!",
      });
    }

    const result = await deleteProduct(id);

    return res.status(200).send({
      status: "ok",
      message: "Produkt slettet!",
      data: result.title,
      statusCode: 200,
    });
  } catch (error) {
    console.error("Der skete en fejl:", error);
    return res.status(500).send({
      status: "error",
      product: "Internal server error",
      error: error.message,
      statusCode: 500,
    });
  }
});

// Get by ID
productRoute.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Produkt ID mangler!",
      });
    }

    const product = await getProductById(id);

    return res.status(200).send({
      status: "ok",
      message: "Produkt hentet!",
      data: product,
      statusCode: 200,
    });
  } catch (error) {
    console.error("Fejl ved hentning af produkt:", error);
    return res.status(500).send({
      status: "error",
      message: "Intern serverfejl",
      error: error.message,
      statusCode: 500,
    });
  }
});

export default productRoute;
