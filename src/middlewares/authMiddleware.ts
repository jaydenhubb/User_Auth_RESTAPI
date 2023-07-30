import jwt, {JwtPayload} from 'jsonwebtoken'
import UserModel from "../model/userModel"
import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import env  from "../utils/validateEnvs"
import {Types} from "mongoose"

interface User{
  username : string 
  _id : Types.ObjectId
}
declare global {
  namespace Express {
    interface Request {
      user?: User 
    }
  }
}
export const protect : RequestHandler = async(req,res,next)=>{
    try{
      const token = req.cookies.token;
      if(!token){
        throw createHttpError(401,"Unauthorized! Please log in.")
      }
      const verified : JwtPayload   = jwt.verify(token, env.JWT_SECRET) as JwtPayload   ;
      
      const user = await UserModel.findById(verified._id).select("-password")
      if(!user){
        throw createHttpError(404, "User not found")
      }
      req.user = user 
      next()
    }catch(error){
      throw createHttpError(401, "Not authorized! Please log in ")
    }
}