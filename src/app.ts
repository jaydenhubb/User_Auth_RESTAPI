import 'dotenv/config'
import express from 'express';
import {Request, Response } from "express"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import errorHandler from './middlewares/errorMiddleware';
import userRoute from './routes/userRoute'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.get('/api/home', (req: Request, res:Response )=>{
    res.send("Welcome to my page!")
})
app.use('/api/users', userRoute)

app.use(errorHandler)



export default app
