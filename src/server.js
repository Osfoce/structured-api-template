import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000
import app from './app.js'
import { connectDb } from './config/db.js';


const startServer = ()=>{
    connectDb();
    app.listen(PORT, ()=> console.log(`Server is listening on port ${PORT}`))
}

startServer();
