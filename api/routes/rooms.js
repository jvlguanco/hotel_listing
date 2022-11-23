import express from "express";
import {
    getAllRoom,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom,
    updateRoomAvailability
} from "../controllers/room.js";
import {verifyAdmin} from "../utils/verifyToken.js";

const router = express.Router();

// Create a new hotel
router.post("/:hotelId", verifyAdmin, createRoom);

// Update a hotel
router.put("/:id",verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);

// Delete a hotel
router.delete("/:id", verifyAdmin, deleteRoom);

// Get a hotel
router.get("/:id", getRoom);

// Get all hotels
router.get("/", getAllRoom);

export default router;