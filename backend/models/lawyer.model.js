const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const LawyerSchema = new mongoose.Schema({
    lawyername: {
        type: String,
        required: [true, "Lawyer name is required"],
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
    registrationNumber: {
        type: String,
        required: [true, "Registration number is required"],
        unique: true,
        trim: true,
    },
    experience: {
        type: Number,
        required: [true, "Experience is required"],
        min: [0, "Experience cannot be less than 0 years"],
    },
    tags: {
        type: [String],
        required: [true, "Tags are required"],
    },
    bio: {
        type: String,
        maxlength: [500, "Bio cannot exceed 500 characters"],
        default: "No bio provided",
    },
    contact: {
        type: String,
        required: [true, "Contact number is required"],
        match: [
            /^[0-9]{10}$/,
            "Contact number must be a valid 10-digit phone number",
        ],
    },
    profilePic: {
        type: String,
        default: "", 
    },
}, { timestamps: true });


const Lawyer = mongoose.model('Lawyer', LawyerSchema);

module.exports = Lawyer;