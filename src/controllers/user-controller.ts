import {Response, Request, NextFunction} from "express";
import logger from "../utils/logger";
import UserService from "../services/user-service";
class UserController{
    async registration(req: Request, res: Response, next: NextFunction){
        try{
            const {email, username, password} = req.body
            const userData = await UserService.registration(email, username, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch(e){
            logger.error(e);
        }
    }
    async login(req: Request, res: Response, next: NextFunction){
        try{

        } catch(e){

        }
    }
    async logout(req: Request, res: Response, next: NextFunction){
        try{

        } catch(e){

        }
    }
    async activate(req: Request, res: Response, next: NextFunction){
        try{

        } catch(e){

        }
    }
    async refresh(req: Request, res: Response, next: NextFunction){
        try{

        } catch(e){

        }
    }
    async getUsers(req: Request, res: Response, next: NextFunction){
        try{
            res.json("ZALUUUPA")
        } catch(e){

        }
    }
}

export default new UserController()