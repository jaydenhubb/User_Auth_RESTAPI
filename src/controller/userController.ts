import {RequestHandler, Request, Response } from 'express'
import createHttpError  from 'http-errors'
import UserModel from '../model/userModel'
import {Types} from "mongoose"
import {createToken} from '../utils/create_jwt_token'
import bcrypt from 'bcrypt'


interface User {
    username: string;
    _id: Types.ObjectId 
}

//declare global {
   // namespace Express {
     //   interface Request {
       //     user?: User;
       // }
    //}
//}


export const dashboard: RequestHandler  = (req,res, next ) => {
    try{
        const {username } = req.user as User 
        res.send(`Welcome to your dashboard ${username}!`)
    }catch(error){
        next(error)
    }
}

// Sign Up 
interface SignUpBody {
        username: string;
        password: string;
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown>= async(req, res, next)=>{
    const {username, password} = req.body;
    try {
          // validate data
         if(!password || !username){
             throw createHttpError(400, 'Please provide username and password');
         }
         if(password.length < 6){
            throw createHttpError(400, 'Password must be at least 6 characters');
         }
         // check database iff username already exist exists
         const exists = await UserModel.findOne({username}).exec()
         if(exists){
             throw createHttpError(400, 'Username already taken');
         }
         // create user
         const user = await UserModel.create({
            username,
            password                   
         })
         await user.save()
         // create token
         const token = createToken(user._id)
         res.cookie("token", token, {
             path: "/",
             httpOnly: true,
             expires: new Date(Date.now() + 1000 * 86400), //one day
             sameSite: "none",
             secure: true,
           });
           if(user){
            const {username }= user
            res.status(201).json({Message: `User successfully created`  })
           }
    }
    catch(error) {
        next(error)
    }
}


//Login
interface loginBody {
        username: string,
        password: string,
}
export const login:RequestHandler<unknown, unknown, loginBody, unknown> = async (req, res, next)=>{
        const {username, password} = req.body
        try{
           if(!username||!password){
               throw createHttpError(400, "Username and password are required")
           }
           const usernameExists = await UserModel.findOne({username}).select("+password").exec()
           if(!usernameExists){
               throw createHttpError(401, "Invalid credentials")
           }
           const hashedPassword = usernameExists.password != undefined ? await bcrypt.compare(password, usernameExists.password) : null
           if(!hashedPassword){
               throw createHttpError(401, "Invalid Credentials")
           }
           const token = createToken(usernameExists._id)
           res.cookie("token", token, {
               path: "/",
               httpOnly: true,
               expires: new Date(Date.now() + 1000 * 86400), //one day
               sameSite: "none",
               secure: true,
             });
           res.status(201).json({Message:`Logged in successfully`})
        }catch(error){
           next(error)
        }
    }