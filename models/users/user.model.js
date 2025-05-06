import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const userScheme = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: {
      type: String,
      default: process.env.SERVER_HOST + "/uploads/users/ninja.png",
    },
    hashedPassword: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
  },
  { timestamps: true }
);

export default mongoose.models.user || mongoose.model("user", userScheme);
