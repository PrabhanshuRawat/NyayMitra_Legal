const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email address",
        ],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    contact: {
        type: String,
        required: [true, "Contact number is required"],
        match: [
            /^[0-9]{10}$/,
            "Contact number must be a valid 10-digit phone number",
        ],
    },
    identificationNumber: {
        type: String,
        required: [true, "Identification number is required"],
        unique: true,
    },
    profilePic: {
        type: String,
        default: "", 
    },
}, { timestamps: true });


const User = mongoose.model('User', UserSchema);

module.exports = User;