import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        min: 3,
        max: 20,
    },
    email: {
        type: String,
        max: 50,
    },
    img: {
        type: String,
    },
    phone:{
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});

export default mongoose.model('User', userSchema);
