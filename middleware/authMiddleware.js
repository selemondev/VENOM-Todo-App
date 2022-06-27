const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModal");

const protect = asyncHandler(async (req,res, next) => {
    let token;

    if(req.headers.authorization &&  req.headers.authorization.startsWith("Bearer")) {
        try {

            // get token from header
            token = req.headers.authorization.split(' ')[1];

            // verfiy the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // GET USER FROM THE TOKEN
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch(error) {
            console.log(error);
            res.status(401)
            throw new Error("Not Authorized")
        }
    }

    if(!token) {
        res.status(401) 
        throw new Error("Not authorized, no token")
    }
});

module.exports = {
    protect
}