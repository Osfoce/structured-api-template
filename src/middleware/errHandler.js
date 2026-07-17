export const globalErrhandler = (err, req, res, next) => {
    
    if (process.env.NODE_ENV === 'development') {
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status || "failed",
                message: err.message || 'internal server error',
                stack: err.stack,
            });
        } else {
            console.log(err);
            res.status(500).json({
                status: err.status || 'error',
                message: 'internal server error',
                stack: err.stack,
            });

        }
    } else {
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status || "failed",
                message: err.message || 'internal server error'
            });
        } else {
            console.log(err);
            res.status(500).json({
                status: err.staus || 'error',
                message: 'internal server error'
            });

        }
    }
}