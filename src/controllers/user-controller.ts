import {Response, Request, NextFunction} from "express";
import UserService from "../services/user-service";
import userService from "../services/user-service";
import {User} from "../entities/user.entity";
import { validate } from 'class-validator';
import ApiError from "../exceptions/api-error";
import {plainToClass} from "class-transformer";
class UserController{
    async registration(req: Request, res: Response, next: NextFunction){
        try{
            const {email, username, password, role} = req.body
            const user = plainToClass(User, { email, username, password , role})
            const errors = await validate(user)
            if (errors.length > 0) {
                return next(ApiError.BadRequest('validation error', errors))
            }
            const userData = await UserService.registration(email, username, password, role)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch(e){
            next(e);
        }
    }
    async login(req: Request, res: Response, next: NextFunction){
        try{
            const {email, username, password} = req.body
            const user = plainToClass(User, { email, username, password });
            const errors = await validate(user)
            if (errors.length > 0) {
                return next(ApiError.BadRequest('validation error', errors))
            }
            const userData = await UserService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch(e){
            next(e);
        }
    }
    async logout(req: Request, res: Response, next: NextFunction){
        try{
            const {refreshToken} = req.cookies;
            const userData = UserService.logout(refreshToken)
            res.clearCookie('userData')
            return res.json(userData)
        } catch(e){
            next(e)
        }
    }
    async activate(req: Request, res: Response, next: NextFunction){
        try{
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL)
        } catch(e){
            next(e);
        }
    }
    async refresh(req: Request, res: Response, next: NextFunction){
        try{
            const {refreshToken} = req.cookies
            const userData = await UserService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch(e){
            next(e);
        }
    }
    async getUsers(req: Request, res: Response, next: NextFunction){
        try{
            const users = await userService.getUsers();
            return res.json(users);
        } catch(e){
            next(e);
        }
    }
}

export default new UserController()