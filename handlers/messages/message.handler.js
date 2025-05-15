import dbConnect from "../../dbConnect.js";
import messageModel from "../../models/messages/message.model.js";

// Get all messages
export const getMessages = async () => {
  try {
    await dbConnect();
    const messages = await messageModel.find({});
    return messages;
  } catch (error) {
    throw new Error("Der skete en fejl:", error);
  }
};

// Create
export const createMessage = async (body) => {
  try {
    await dbConnect();
    const message = await messageModel.create(body);
    return message;
  } catch (error) {
    console.error("Der skete en fejl:", error);
    throw new Error("Der skete en fejl:", error);
  }
};

// Update
export const updateMessage = async (body) => {
  try {
    await dbConnect();
    const message = await messageModel.findById(body.id);

    if (!message) {
      return {
        status: "error",
        message: "Besked ikke fundet",
        data: [],
      };
    }

    const { id, ...updateData } = body;

    const updatedMessage = await messageModel.findByIdAndUpdate(id, updateData);

    return updatedMessage;
  } catch (error) {
    throw new Error("Opdatering af besked fejlede: " + error.message);
  }
};

// Delete
export const deleteMessage = async (id) => {
  try {
    await dbConnect();
    const message = await messageModel.findById(id);

    if (!message) {
      return {
        status: "error",
        message: "Produkt ikke fundet",
        data: [],
      };
    }

    const deletedMessage = await messageModel.findByIdAndDelete(id);
    return deletedMessage;
  } catch (error) {
    throw new Error("Der skete en fejl under sletning af produkt:", error);
  }
};

// Get by ID
export const getMessageById = async (id) => {
  try {
    await dbConnect();
    const message = await messageModel.findById(id);
    return message;
  } catch (error) {
    throw new Error("Der skete en fejl:", error);
  }
};
