import express from 'express';
import cors from 'cors';
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import { globalErrhandler } from './middleware/errHandler.js';



const app = express();
app.use(express.json());
app.use(express.static('public'))
app.use(cors())

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);

app.use((req, res)=>{
    res.status(404).json({
        status: 'failed',
        message: `The endpoint ${req.originalUrl} does not exists in the server`
    })
});

app.use(globalErrhandler)

export default app;