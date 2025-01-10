const jwt = require('jsonwebtoken');
const Lawyer = require('../models/lawyer.model');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ msg: "Authentication required." });
    }

    try {
       
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const lawyer = await Lawyer.findById(decoded.id);

        if (!lawyer) {
            return res.status(404).json({ msg: "Lawyer not found." });
        }

        req.lawyer = lawyer; 
        next(); 
    } catch (err) {
        console.error("Authentication error:", err.message);
        res.status(401).json({ msg: "Invalid or expired token." });
    }
};

module.exports = authMiddleware;