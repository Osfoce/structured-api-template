import jwt from 'jsonwebtoken';

const generateAccessToken = (user)=>{
   const accessToken = jwt.sign(
        {user},
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.expiresIn
        }
    )
    return accessToken
}

export default generateAccessToken