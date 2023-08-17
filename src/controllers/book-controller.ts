import {Response, Request, NextFunction} from "express";
import BookService from "../services/book-service";
import {validate} from "class-validator";
import ApiError from "../exceptions/api-error";
import {plainToClass} from "class-transformer";
import {Book} from "../entities/book.entity";
import {v4} from "uuid";
import path from "path";
import logger from "../utils/logger";
import {UploadedFile} from "express-fileupload";

class BookController{
    async create(req: Request, res: Response, next: NextFunction){
        try{
            const {name, author, description, ISBN, typeId, publisherId} = req.body
            const {file} = req.files as { file: UploadedFile };
            const validationBook = plainToClass(Book, {name, author, description, file, ISBN, typeId, publisherId});
            const errors = await validate(validationBook)
            if (errors.length > 0) {
                return next(ApiError.BadRequest('validation error', errors))
            }
            const fileName = v4() + '.pdf';
            logger.info(fileName)
            file.mv(path.resolve(__dirname, '..', 'static', fileName))

            const book = await BookService.create(name, author, description, fileName, ISBN, typeId, publisherId)
            return res.json(book)
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction){
        try{
            const books = await BookService.getAll();
            return res.json(books);
        } catch(e) {
            next(e);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction){
        try{
            const {id} = req.body;
            const book = await BookService.getOne(id)
            return res.json(book)
        } catch(e){
            next(e);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction){
        try{
            const {id} = req.body;
            const book = await BookService.delete(id)
            return res.json(book)
        } catch(e){
            next(e);
        }
    }
}
export default new BookController()