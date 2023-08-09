import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import testRoutes from './routes/testRoutes.js';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from "./middlewares/errorMiddleware.js";


//config
dotenv.config();


//MongoDB Connection
connectDB();



//rest objects
const app = express();



//middlewares
app.use(express.json());
app.use(cors())
app.use(morgan('dev'))

//routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);


//validation middleware
app.use(errorMiddleware);



//Port 
const PORT = process.env.PORT || 8080;



app.listen(PORT, () => {

    console.log(`Node Server running in ${process.env.DEV_MODE} ${PORT}`);             //from .env file(To make app secure)
});

