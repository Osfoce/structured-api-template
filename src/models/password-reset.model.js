import mongoose from 'mongoose';

const resetTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    token: {
        type: String,
        required: true,
        unique: true,
    },
    expiresIn: {
        type: Date,
        required: true,
        index: { expires: 0 }
    }
}, { timestamps: true }

);

const ResetToken = mongoose.model("ResetToken", resetTokenSchema);

export default ResetToken;