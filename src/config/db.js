import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const dbURI = process.env.DB_CONNECT_URI.replace('<db_password>', process.env.DB_PASSWORD);
        
        await mongoose.connect(dbURI);
        console.log('Database connected successfully');
        
    } catch (error) {
        console.log('Database error ', error);
        process.exit(1);
    }
}