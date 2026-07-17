import User from "../models/user.model.js";

export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        res.status(200).json({
            status: 'success',
            user
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}
export const getUserByIdAndUpdate = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            username: req.body.username
        }, {new: true}
    ).select('-password');

        res.status(200).json({
            status: 'success',
            user
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}
export const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)

        res.status(204).json({
            status: 'success',
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}