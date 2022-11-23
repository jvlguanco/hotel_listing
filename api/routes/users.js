import express from "express";
import {
    getAllUser,
    getUser,
    updateUser,
    deleteUser,
} from "../controllers/user.js";
import {
    verifyUser, 
    verifyAdmin
} from "../utils/verifyToken.js";

const router = express.Router();

// Update a User
router.put("/:id", verifyUser, updateUser);

// Delete a User
router.delete("/:id", verifyUser, deleteUser);

// Get a User
router.get("/:id",verifyUser,getUser);

// Get all Users
router.get("/",verifyAdmin, getAllUser);

export default router;