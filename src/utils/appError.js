class AppError extends Error{
     constructor(message, statusCode){
        super(message);
      //   this.status = `${String(statusCode)}.${startsWith('4')} ? 'failed':'error' `
        this.statusCode = statusCode;
        this.isOperational = true;

        // limit stack from showing in appError class
        Error.captureStackTrace(this, this.constructor);
     }
}

export default AppError