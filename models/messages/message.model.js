import mongoose, { Schema } from "mongoose";

// Validering
mongoose.set("runValidators", true);

const messageSchema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String },
    subject: { type: String },
    message: { type: String },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.message ||
  mongoose.model("message", messageSchema);
