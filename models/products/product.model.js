import mongoose, { Schema } from "mongoose";

// Validering
mongoose.set("runValidators", true);

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
  image: { type: String },
  category: { type: String },
});

export default mongoose.models.product ||
  mongoose.model("product", productSchema);

// let products = [];

// // Get all
// export const find = async () => products;

// // Create
// export const create = async (body) => {
//   const newProduct = { ...body, id: crypto.randomUUID() };

//   products.push(newProduct);

//   return {
//     status: "ok",
//     message: "Produkt oprettet",
//     data: newProduct,
//   };
// };

// // Update
// export const findByIdAndUpdate = async (id, updatedData) => {
//   // Fejl: = i stedet for =>
//   const index = products.findIndex((p) => p.id === id);
//   if (index === -1) return null;

//   // Erstat produktet med en ny version (behold det gamle og overskriv med nye værdier)
//   products[index] = { ...products[index], ...updatedData };

//   return products[index];
// };

// // Delete
// export const findByIdAndDelete = async (id) => {
//   const index = products.findIndex((p) => p.id === id);

//   if (index === -1) return null;

//   const deleted = products[index];

//   products.splice(index, 1);

//   return deleted;
// };

// // Get by ID
// export const findById = async (id) => products.find((p) => p.id === id);
