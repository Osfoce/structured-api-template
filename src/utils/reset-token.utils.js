import crypto from 'crypto';
import ResetToken from '../models/password-reset.model.js';


export const resetToken = async (userId) => {
    try {
            // generate reset token
    const resetToken = crypto.randomBytes(16).toString('hex');

    // hash the resetToken and save to database
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // save the resetToken to the database
    await ResetToken.create({
        userId,
        token: hashedToken,
        expiresIn: new Date(Date.now() + 15 * 60 * 1000) // Expires in 15m
    });

    return resetToken;

    } catch (error) {
        console.log(error);
    }
}