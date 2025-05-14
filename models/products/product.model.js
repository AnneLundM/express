import mongoose, { Schema } from "mongoose";

// Validering
mongoose.set("runValidators", true);

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    image: {
      type: String,
      default: process.env.SERVER_HOST + "/uploads/products/no-image.jpg",
    },
    category: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.product ||
  mongoose.model("product", productSchema);
