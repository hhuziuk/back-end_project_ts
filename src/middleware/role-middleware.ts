import { Response, Request, NextFunction } from "express";
import ApiError from "../exceptions/api-error";
import tokenService from "../services/token-service";

interface IDecode {
    id: string;
    username: string;
    email: string;
    isActivated: boolean;
    role: string;
}

interface RequestWithUser extends Request {
    user?: IDecode,
}

export default function(role){
    return function(req: RequestWithUser, res: Response, next: NextFunction) {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return ApiError.UnauthorizedError()
            }
            const decoded = <IDecode> tokenService.validateAccessToken(token);
            if(decoded.role !== role){
                return ApiError.AccessDenied()
            }
            req.user = decoded;
            next();
        } catch (e) {
            return ApiError.UnauthorizedError()
        }
    }
}