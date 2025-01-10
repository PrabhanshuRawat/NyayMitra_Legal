const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Lawyer = require('../models/lawyer.model');


const getUserSignUp = async (req, res) => {
    try {
        const { username, email, password, identificationNumber, contact, image } = req.body;

        if (!username || !email || !password || !identificationNumber || !contact) {
            return res.status(400).json({ msg: "Please provide all the necessary details" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ msg: "User already exists" });
        }

  
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            identificationNumber,
            contact,
            profilePic: image || "",
        });

        await newUser.save();

        
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });

        res.status(200).json({
            msg: 'User Created Successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                contact: newUser.contact,
                profilePic: newUser.profilePic,
            },
            token
        });
    } catch (err) {
        console.error("Error during user sign-up:", err.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


const getUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "Please provide credentials" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User does not exist. Please Sign Up." });
        }

   
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ msg: "Incorrect credentials" });
        }


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });

        res.status(200).json({
            msg: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                contact: user.contact,
                profilePic: user.profilePic || "",
            },
            token
        });
    } catch (err) {
        console.error("Error during user login:", err.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


const getLawyerSignUp = async (req, res) => {
    try {
        const { lawyername, email, password, registrationNumber, experience, tags, bio, contact, profilePic } = req.body;

        if (!lawyername || !email || !password || !registrationNumber || !experience || !contact) {
            return res.status(400).json({ msg: "Please provide all the necessary details" });
        }

        const lawyerExists = await Lawyer.findOne({ email });
        if (lawyerExists) {
            return res.status(400).json({ msg: "Lawyer already exists" });
        }

      
        const hashedPassword = await bcrypt.hash(password, 10);

        const newLawyer = new Lawyer({
            lawyername,
            email,
            password: hashedPassword,
            registrationNumber,
            experience,
            tags,
            bio,
            contact,
            profilePic: profilePic || "",
        });

        await newLawyer.save();

    
        const token = jwt.sign({ id: newLawyer._id }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });

        res.status(200).json({
            msg: 'Lawyer Created Successfully',
            lawyer: {
                id: newLawyer._id,
                lawyername: newLawyer.lawyername,
                email: newLawyer.email,
                contact: newLawyer.contact,
                experience: newLawyer.experience,
                tags: newLawyer.tags,
                bio: newLawyer.bio,
                profilePic: newLawyer.profilePic,
            },
            token
        });
    } catch (err) {
        console.error("Error during lawyer sign-up:", err.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
    
};


const getLawyerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "Please provide credentials" });
        }

        const lawyer = await Lawyer.findOne({ email });
        if (!lawyer) {
            return res.status(404).json({ msg: "Lawyer does not exist. Please Sign Up." });
        }

 
        const isPasswordCorrect = await bcrypt.compare(password, lawyer.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ msg: "Incorrect credentials" });
        }

   
        const token = jwt.sign({ id: lawyer._id }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });

        res.status(200).json({
            msg: "Login successful",
            lawyer: {
                id: lawyer._id,
                lawyername: lawyer.lawyername,
                email: lawyer.email,
                contact: lawyer.contact,
                experience: lawyer.experience,
                tags: lawyer.tags,
                bio: lawyer.bio,
                profilePic: lawyer.profilePic,
            },
            token
        });
    } catch (err) {
        console.error("Error during lawyer login:", err.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


const getLogout = (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ msg: "Logout failed. Please try again." });
            }
            res.status(200).json({ msg: "Logout successful." });
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

module.exports = {
    getUserSignUp,
    getUserLogin,
    getLawyerSignUp,
    getLawyerLogin,
    getLogout,
};