import {Response, Request, NextFunction} from "express";
import logger from "../utils/logger";
import ApiError from '../exceptions/api-error'

export default function(error: Error, req: Request, res: Response, next: NextFunction){
    logger.error(error)
    if(error instanceof ApiError){
        return res.status(error.status).json({message: error.message, errors: error.errors})
    }
    return res.status(500).json({message: 'unexpected error'})
}
