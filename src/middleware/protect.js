import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import AppError from '../utils/appError.js';

export const protect = async (req, res, next) => {
    try {
        // get the access token from the header or cookies
        const headers = req.headers.authorization;

        if (!headers || !headers.startsWith('Bearer ')) return next(new AppError("Unauthorized", 401));

        const token = headers.split(' ')[1]
        // Verify the token

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);


        // verify the user from db
        const user = await User.findById(decoded.user.id).select('-password');
        if (!user) return next(new AppError("User with the access token does not exist in the database", 400));
        // save the user to the request body
        req.user = user;

        next();
    } catch (error) {
        if(error.name === 'JsonWebTokenError') return next(new AppError('Invalid token, please log in', 400))
        if(error.name === 'TokenExpiredError') return next(new AppError('Token expired, please log in', 400))
        return next(error);
    }
}