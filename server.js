import express from "express";
import cors from "cors";
import productRoute from "./routes/products/product.route.js";
import authRoute from "./routes/auth/auth.js";
import userRoute from "./routes/user/user.route.js";
import messageRoute from "./routes/messages/message.route.js";

// Server
const expressServer = express();

// Tillader requests fra forskellige porte
expressServer.use(cors());

// Gør alle filer offentligt tilgængelige (servér dem fra serveren som de er)
expressServer.use("/uploads", express.static("uploads"));

// For at kunne læse req.body i JSON
expressServer.use(express.json());

// Routes
expressServer.use(productRoute);
expressServer.use(authRoute);
expressServer.use(userRoute);
expressServer.use(messageRoute);

expressServer.listen(3042, () => {
  console.log("Serveren kører på http://localhost:3042");
});
