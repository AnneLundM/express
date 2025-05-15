import express from "express";
import {
  createMessage,
  deleteMessage,
  getMessageById,
  getMessages,
  updateMessage,
} from "../../handlers/messages/message.handler.js";
import auth from "../../middleware/auth.middleware.js";

const messageRoute = express.Router();

// Get all messages
messageRoute.get("/messages", auth, async (req, res) => {
  try {
    const result = await getMessages();

    return res.status(200).send({
      status: "ok",
      message: "Beskederne blev hentet!",
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
messageRoute.post("/message", async (req, res) => {
  try {
    const { email, name, subject, message, isRead } = req.body;

    if (!email) {
      return res.status(400).send({
        status: "error",
        message: "Der mangler en email!",
      });
    }

    const data = { email, name, subject, message, isRead };

    const result = await createMessage(data);

    return res.status(201).send({
      status: "Oprettet",
      message: "Beskeden blev oprettet med success!",
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
});

// Update
messageRoute.put("/message", auth, async (req, res) => {
  try {
    const { id, email, name, subject, message, isRead } = req.body;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Besked ID mangler!",
        data: [],
      });
    }

    // Saml beskeddata i et objekt
    const messageData = { id, email, name, subject, message, isRead };

    // Send det videre som argument til handler
    const result = await updateMessage(messageData);

    return res.status(200).send({
      status: "ok",
      message: "Besked opdateret!",
      data: result,
      statusCode: 200,
    });
  } catch (error) {
    console.error("Error updating message:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
      statusCode: 500,
    });
  }
});

// Delete
messageRoute.delete("/message/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Besked ID mangler!",
      });
    }

    const result = await deleteMessage(id);

    return res.status(200).send({
      status: "ok",
      message: "Besked slettet!",
      data: result.title,
      statusCode: 200,
    });
  } catch (error) {
    console.error("Der skete en fejl:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
      statusCode: 500,
    });
  }
});

// Get by ID
messageRoute.get("/message/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "Besked ID mangler!",
      });
    }

    const message = await getMessageById(id);

    return res.status(200).send({
      status: "ok",
      message: "Besked hentet!",
      data: message,
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

export default messageRoute;
