import jwt from 'jsonwebtoken'
import UserModel from "../model/userModel"
import { RequestHandler } from 'express'

export const protect : RequestHandler = async()