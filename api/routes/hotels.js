import express from "express";
import {
    getAllHotel,
    getHotel,
    createHotel,
    updateHotel,
    deleteHotel,
    countByIsland,
    countByType,
    getHotelRoom,
    createReview,
    getReview,
} from "../controllers/hotel.js";
import {verifyAdmin, verifyUser} from "../utils/verifyToken.js";

const router = express.Router();

// Create a new hotel
router.post("/", verifyAdmin, createHotel);

// Update a hotel
router.put("/:id",verifyAdmin, updateHotel);

// Delete a hotel
router.delete("/:id", verifyAdmin, deleteHotel);

// Get a hotel
router.get("/find/:id", getHotel);

// Get all hotels
router.get("/", getAllHotel);
router.get("/countByIsland", countByIsland);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRoom);

// Review
router.post("/review", verifyUser, createReview);
router.get("/review/:id", getReview);

export default router;