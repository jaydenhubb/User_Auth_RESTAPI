
import { NextFunction,Request, Response } from 'express'
import { isHttpError } from 'http-errors'

const errorHandler = (error: unknown, req:Request, res:Response, next:NextFunction)=>{
        let errorMessage = "An unknown error occured"
        let statusCode = 500
        if(isHttpError(error)){
            statusCode= error.status
            errorMessage = error.message
        }
        if(error instanceof Error) errorMessage = error.message;
        res.status(statusCode).json({error: errorMessage})
}
export default errorHandler