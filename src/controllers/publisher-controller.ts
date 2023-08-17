import {Response, Request, NextFunction} from "express";
import PublisherService from "../services/publisher-service";
import {plainToClass} from "class-transformer";
import {Publisher} from "../entities/publisher.entity";
import {validate} from "class-validator";
import ApiError from "../exceptions/api-error";

class PublisherController{
    async create(req: Request, res: Response, next: NextFunction){
        try{
            const {name} = req.body
            const userPublisher = plainToClass(Publisher, { name })
            const errors = await validate(userPublisher)
            if (errors.length > 0) {
                return next(ApiError.BadRequest('validation error', errors))
            }
            const publisher = await PublisherService.create(name)
            return res.json(publisher)
        } catch(e){
            next(e);
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction){
        try{
            const publishers = await PublisherService.getAll();
            return res.json(publishers);
        } catch(e) {
            next(e);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction){
        try{
            const {id} = req.body;
            const publisher = await PublisherService.getOne(id)
            return res.json(publisher)
        } catch(e){
            next(e);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction){
        try{
            const {id} = req.body;
            const publisher = await PublisherService.delete(id)
            return res.json(publisher)
        } catch(e){
            next(e);
        }
    }
}
export default new PublisherController()