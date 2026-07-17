const restrictTo = (...roles) => {
    return (req, res, next) => {
        console.log(req.user.role);
        console.log(roles);
        console.log("role includes user",roles.includes(req.user.role));
        
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'failed',
                message: "You are not permitted to access this resource"
            })
        }
        next();
    }
}

export default restrictTo;

