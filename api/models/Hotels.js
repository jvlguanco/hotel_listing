import mongoose from 'mongoose';
const {Schema} = mongoose;

const hotelSchema = new Schema({
    name: {
        type: String,
    },
    distance: {
        type: String,
    },
    type: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    island: {
        type: String,
    },
    photos: {
        type: [String],
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    rooms: {
        type: [String],
    },
    cheapestPrice: {
        type: Number,
    },
    featured: {
        type: Boolean,
        default: false
    },
    ratings: {
        type: Number,
        default: 0.0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: mongoose.Schema.Types.ObjectId,
            },
            rating: {
                type: Number,
            },
            comment: {
                type: String,
            },
        }
    ],
}, {timestamps: true}
);

export default mongoose.model('Hotel', hotelSchema);
