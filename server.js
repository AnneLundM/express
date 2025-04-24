import express from "express";
import cors from "cors";
import productRoute from "./routes/products/product.route.js";

// Server
const expressServer = express();

// Tillader requests fra forskellige porte
expressServer.use(cors());

// For at kunne læse req.body i JSON
expressServer.use(express.json());

// Routes
expressServer.use(productRoute);

expressServer.listen(3000, () => {
  console.log("Serveren kører på http://localhost:3000");
});
