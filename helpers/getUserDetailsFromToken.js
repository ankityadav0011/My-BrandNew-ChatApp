const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
require('dotenv').config();
const getUserDetailsFromToken = async (token) => {
    if (!token) {
        return {
            message: "Session expired or no token provided",
            logout: true
        };
    }
    
    
        console.log("JWT Secret Key:", process.env.JWT_SECRET_KEY);  // Log to check if the key is loaded

    try {
        // Decoding the token
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Fetch user details
        const user = await UserModel.findById(decode.id).select('-password');

        if (!user) {
            return { message: "User not found", logout: true };
        }

        return user;
    } catch (error) {
        console.error("Error in token verification:", error);
        return { message: "Invalid token or session expired", logout: true };
    }
};

module.exports = getUserDetailsFromToken;
