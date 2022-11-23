import Hotel from "../models/Hotels.js";
import Room from "../models/Rooms.js";

export const createHotel = async (req, res, next) => {
    const hotel = new Hotel(req.body);

    try{
        const savedHotel = await hotel.save();
        res.status(200).json(savedHotel);
    }catch (err){
        next(err);
    }
};

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }
};

export const deleteHotel = async (req, res, next) => {
    try{
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted.");
    }catch (err){
        next(err);
    }
};

export const getHotel = async (req, res, next) => {
    try{
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    }catch (err){
        next(err);
    }
};

export const getAllHotel = async (req, res, next) => {
    const {min, max, ...others} = req.query;

    try{
        const hotels = await Hotel.find({...others,cheapestPrice: {
                $gte: min ? min : 0,
                $lte: max ? max : 5000
        }}).limit(req.query.limit);
        res.status(200).json(hotels);
    }catch (err){
        next(err);
    }
};

export const countByIsland = async (req, res, next) => {
    const islands = req.query.islands.split(",");
    
    try{
        const list = await Promise.all(islands.map(island=>{
            return Hotel.countDocuments({island: island});
        }))
        res.status(200).json(list);
    }catch (err){
        next(err);
    }
};

export const countByType = async (req, res, next) => {
    try{
        const hotelCount = await Hotel.countDocuments({type:"Hotel"});
        const apartmentCount = await Hotel.countDocuments({type:"Apartment"});
        const condoCount = await Hotel.countDocuments({type:"Condominium"});
        const resortCount = await Hotel.countDocuments({type:"Resort"});
        
        res.status(200).json([
            {type:"Hotel", count: hotelCount},
            {type:"Apartment", count: apartmentCount},
            {type:"Condominium", count: condoCount},
            {type:"Resort", count: resortCount}
        ]);
    }catch (err){
        next(err);
    }
};

export const getHotelRoom = async (req, res, next) => {
    try{
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(hotel.rooms.map((room)=>{
            return Room.findById(room);
        })
        );
        res.status(200).json(list);
    }catch(err){
        next(err);
    }
}

export const createReview = async (req, res, next) => {
    try{
        const {rating, comment, hotelId} = req.body;
        const review = {
            rating: Number(rating),
        }

        const hotel = await Hotel.findById(hotelId);

        hotel.reviews.push(review);
        hotel.numReviews = hotel.reviews.length;
        hotel.ratings = hotel.reviews.reduce((acc, item) => item.rating + acc, 0) / hotel.reviews.length;
        await hotel.save({validateBeforeSave: false});

        res.status(200).json({success: true});
    }catch(err){
        next(err);
    }
}

export const getReview = async (req, res, next) => {
    try{
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel.reviews);
    }catch(err){
        next(err);
    }
}
