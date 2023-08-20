import {Response, Request, NextFunction} from "express";
import TypeService from "../services/type-service";
import {plainToClass} from "class-transformer";
import {Type} from "../entities/type.entity";
import {validate} from "class-validator";
import ApiError from "../exceptions/api-error";

class TypeController{
    async create(req: Request, res: Response, next: NextFunction){
        try{
            const {name} = req.body
            const userType = plainToClass(Type, { name })
            const errors = await validate(userType)
            if (errors.length > 0) {
                return next(ApiError.BadRequest('validation error', errors))
            }
            const type = await TypeService.create(name)
            return res.json(type)
        } catch(e){
            next(e);
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction){
        try{
        const types = await TypeService.getAll();
        return res.json(types);
        } catch(e) {
            next(e);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction){
        try{
            const {id} = req.params
            const type = await TypeService.getOne(parseInt(id, 10))
            return res.json(type)
        } catch(e){
            next(e);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction){
        try{
            const {id} = req.body;
            const type = await TypeService.delete(id)
            return res.json(type)
        } catch(e){
            next(e);
        }
    }
}
export default new TypeController()