import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import generateAccessToken from '../utils/jwt.utils.js'
import AppError from '../utils/appError.js'
import { resetToken } from '../utils/reset-token.utils.js';
import { sendEmail } from '../utils/email.utils.js';
import crypto from 'crypto'
import ResetToken from '../models/password-reset.model.js';


export const createUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        // query the db and check for existing email
        const userExist = await User.findOne({ email });

        // if email exists return error
        if (userExist) return next(new AppError('Email already exists', 400));

        // hash password
        const hassedPassword = await bcrypt.hash(password, 12);
        // create user
        const newUser = new User({
            username,
            email,
            password: hassedPassword
        });
        await newUser.save();

        const userDetails = {
            id: newUser.id,
            role: newUser.role
        }
        // create access token for user
        const accessToken = generateAccessToken(userDetails);

        res.status(201).json({
            status: 'success',
            data: userDetails,
            accessToken
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

// login handler
export const login = async (req, res, next) => {
    try {
        const {email, password } = req.body;
        // query the db and check for existing email
        const userExist = await User.findOne({ email });

        // Check and return error if user does not exist
        if (!userExist) return next(new AppError('Invalid credentials', 400));

        // hash password
        const isValidPassword = await bcrypt.compare(password, userExist.password);
        
        if (!isValidPassword) return next(new AppError('Invalid credentials', 400));

        const userDetails = {
            id: userExist.id,
            role: userExist.role
        }
        // create access token for user
        const accessToken = generateAccessToken(userDetails);

        res.status(200).json({
            status: 'success',
            data: userDetails,
            accessToken
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const dashboard = async (req, res, next) => {
    try {
        const id = req.user.id;
        // get the users detail from db
        const user = await User.findById(id).select('-password');

        // send it to the client
        res.status(200).json({
            status: 'success',
            data: {
                user
            },
            message: `Welcome back ${user.username}`
        })
    } catch (error) {
        next(error);
    }
}

export const forgotPassword = async (req, res, next) => {
    try {
        // Get the users email
        const email = req.body.email;

        // verify if email exists
        const emailExist = await User.findOne({ email });

        if(!emailExist) return next(new AppError("Email does not exist", 404));

        // generate resetToken
        const token = await resetToken(emailExist.id);
        const resetUrl = `http://localhost:3000/api/v1/auth/reset-password?${token}`

        const emailDeatails = {
            to: emailExist.email,
            from: process.env.EMAIL_FROM,
            subject: "Reset password",
            url: resetUrl,
            template: `<p>Click on the link to reset your password <a href=${resetUrl}>Click here</a> </p>`
        }

        // send email reset token
        await sendEmail(emailDeatails);
        // send back a response to the user, notifying them to check their mail for a reset link.
        res.status(200).json({
            status: 'success',
            message: 'Please check your eamil for your password reset link'
        });

    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const resetPassword = async (req, res, next) => {
    try {
        // get the resetToken
        const resetToken = req.query.token;
        // new password
        const newPassword = req.body.password;
        
        // hash resetToken for comparison
        const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        // check if token exists in db and the TTL is still valid
        const tokenExist = await ResetToken.findOne({token: hashedResetToken});
        if(!tokenExist || tokenExist.expiresIn < Date.now()) return next(new AppError("None existing or expired token", 404));
        
        // hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        // save the new password
        await User.findByIdAndUpdate({_id: tokenExist.userId}, {
            password: hashedPassword,
        }, {new: true});

        await ResetToken.findOneAndDelete({token: hashedResetToken});

        // send sucess response
        res.status(201).json({
            status: 'success',
            message: "Password changed successfully"
        });
    } catch (error) {
        console.log(error);
        next(error)
        
    }
}