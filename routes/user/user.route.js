import express from "express";
import bcrypt from "bcryptjs";
import multer from "multer";
import auth from "../../middleware/auth.middleware.js";

import {
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} from "../../handlers/user/user.handler.js";

const userRoute = express.Router();

// Konfiguration af multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/users");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// GET ALL
userRoute.get("/users", async (req, res) => {
  try {
    const result = await getUsers();

    if (result.status === "ok") {
      return res.status(200).send(result);
    }

    return res.status(500).send(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// POST
userRoute.post("/user", upload.single("image"), async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({
        status: "error",
        message: "All fields (name, email, role, password) are required",
        data: [],
      });
    }

    const user = { name, email, role, password };

    // req.file bliver automatisk tilføjet af multer
    if (req.file) {
      user.image =
        process.env.SERVER_HOST + "/uploads/users/" + req.file.filename;
    }

    const result = await createUser(user);

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(201).send(result);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// PUT
userRoute.put("/user", auth, upload.single("image"), async (req, res) => {
  try {
    const { id, name, email, role, password } = req.body;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "User ID is required",
        data: [],
      });
    }

    if (!name && !email && !role && !password && !req.file) {
      return res.status(400).send({
        status: "error",
        message:
          "At least one field (name, email, role, password, or picture) must be provided for update",
        data: [],
      });
    }

    const updatedUser = { id };

    if (name) updatedUser.name = name;
    if (email) updatedUser.email = email;
    if (role) updatedUser.role = role;

    if (password) {
      if (password.length < 6) {
        return res.status(400).send({
          status: "error",
          message: "Password must be at least 6 characters long",
          data: [],
        });
      }
      updatedUser.hashedPassword = await bcrypt.hash(password, 10);
    }

    if (req.file) {
      updatedUser.image =
        process.env.SERVER_HOST + "uploads/users/" + req.file.filename;
    }

    const result = await updateUser(updatedUser);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// DELETE
userRoute.delete("/user/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "User ID is required",
        data: [],
      });
    }

    if (!isValidObjectId(id)) return;

    const result = await deleteUser(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// GET By ID
userRoute.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "User ID is required",
        data: [],
      });
    }

    const result = await getUserById(id);

    if (result.status === "not_found") {
      return res.status(404).send(result);
    }

    if (result.status === "error") {
      return res.status(500).send(result);
    }

    return res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default userRoute;
