import 'dotenv/config'
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import errorHandler from './middlewares/errorMiddleware';

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())



app.use(errorHandler)



export default app
