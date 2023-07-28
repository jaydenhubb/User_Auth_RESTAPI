import {RequestHandler} from 'express'
import createHttpError  from 'http-errors'
import UserModel from '../model/userModel'
import {createToken} from '../utils/create_jwt_token'
import bcrypt from 'bcrypt'


interface SignUpBody {
        email: string;
        password: string;
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown>= async(req, res, next)=>{
    const {email, password} = req.body;
    try {
          // validate data
         if(!password || !email){
             throw createHttpError(400, 'Please provide email and password');
         }
         if(password.length < 6){
            throw createHttpError(400, 'Password must be at least 6 characters');
         }
         // check database if it exists
         const exists = await UserModel.findOne({email}).exec()
         if(exists){
             throw createHttpError(400, 'Email already exists');
         }
         // create user
         const user = await UserModel.create({
            email,
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
            const {email }= user
            res.status(201).json({Message: `Welcome to your dashboard ${email}!`  })
           }
    }
    catch(error) {
        next(error)
    }
}