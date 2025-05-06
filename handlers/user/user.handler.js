import dbConnect from "../../dbConnect.js";
import bcrypt from "bcrypt";
import { deleteUserImage } from "../file.handler.js";
import userModel from "../../models/users/user.model.js";

// GET ALL USERS
export const getUsers = async () => {
  try {
    await dbConnect();

    const users = await userModel.find({}).select("-password -__v");

    return {
      status: "ok",
      message: "Users fetched successfully",
      data: users,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      status: "error",
      message: "An error occurred while fetching users",
      data: [],
      error: error.message,
    };
  }
};

// CREATE USER
export const createUser = async ({ name, email, role, password, image }) => {
  try {
    await dbConnect();

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return {
        status: "error",
        message: "User with this email already exists",
        data: [],
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      role,
      image,
      hashedPassword,
    });

    return {
      status: "ok",
      message: "User created successfully",
      data: user,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      status: "error",
      message: "An error occurred while creating the user",
      data: [],
      error: error.message,
    };
  }
};

// UPDATE USER
export const updateUser = async (user) => {
  try {
    await dbConnect();

    const existingUser = await userModel.findById(user.id);
    if (!existingUser) {
      return {
        status: "not_found",
        message: "User not found",
        data: [],
      };
    }

    if (user.image && existingUser.image !== user.image) {
      await deleteUserImage(existingUser.picture);
    }

    const updatedUser = await userModel.findByIdAndUpdate(user.id, user, {
      new: true,
    });

    return {
      status: "ok",
      message: "User updated successfully",
      data: updatedUser,
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      status: "error",
      message: "An error occurred while updating the user",
      data: [],
      error: error.message,
    };
  }
};

// DELETE USER
export const deleteUser = async (id) => {
  try {
    await dbConnect();

    const user = await userModel.findById(id);
    if (!user) {
      return {
        status: "not_found",
        message: "User not found",
        data: [],
      };
    }

    if (user.picture && !user.picture.includes("no-user.jpg")) {
      await deleteUserImage(user.picture);
    }

    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return {
        status: "not_found",
        message: "User not found",
        data: [],
      };
    }

    return {
      status: "ok",
      message: "User deleted successfully",
      data: deletedUser,
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      status: "error",
      message: "An error occurred while deleting the user",
      data: [],
      error: error.message,
    };
  }
};

// GET USER BY ID
export const getUserById = async (id) => {
  try {
    await dbConnect();

    const user = await userModel.findById(id).select("-password -__v");

    if (!user) {
      return {
        status: "not_found",
        message: "User not found",
        data: [],
      };
    }

    return {
      status: "ok",
      message: "User fetched successfully",
      data: user,
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return {
      status: "error",
      message: "An error occurred while fetching the user",
      data: [],
      error: error.message,
    };
  }
};
