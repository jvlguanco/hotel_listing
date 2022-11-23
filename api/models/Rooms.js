import mongoose from 'mongoose';
const {Schema} = mongoose;

const roomSchema = new Schema({
    title: {
        type: String,
    },
    price: {
        type: Number,
    },
    description: {
        type: String,
    },
    maxPeople: {
        type: Number,
    },
    hotelId: {
        type: String,
    },
    roomNumber: [{number: Number, unavailableDates: [{type: [Date]}]}],
}, 
{timestamps: true}
);

export default mongoose.model('Room', roomSchema);
