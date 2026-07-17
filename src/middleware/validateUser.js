const validate = (data) => {
    return (req, res, next)=>{
                const result = data.safeParse(req.body);
        if (!result.success) {
            res.status(409).json({
                status: 'failed',
                errors: result.error.issues
            })
        } else {
            req.body = result.data; 

            next();
        }
    }
}

export default validate;

