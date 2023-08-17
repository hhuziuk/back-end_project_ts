import {PostgresDataSource} from "../utils/connect";
import {Book} from "../entities/book.entity";
import ApiError from "../exceptions/api-error";
import BookDto from "../dtos/book-dto";
import logger from "../utils/logger";

const bookRepository = PostgresDataSource.getRepository(Book);

class BookService{
    async create (name: string, author: string, description: string, file: string, ISBN: string,
                  typeId: number, publisherId: number) {
        const userBook = await bookRepository.findOne({where: {ISBN}})
        if(userBook){
            logger.info("yes")
            throw ApiError.BadRequest(`The same book already exists`)
        }
        const book  = await bookRepository.create({name, author, description, file, ISBN, typeId, publisherId})
        await bookRepository.save(book)

        const bookDto = new BookDto(book)
        return {
            BookDto: bookDto
        };
    }
    async getAll (){
        const books = await bookRepository.find()
        return {
            books
        };
    }
    async getOne (id: number){
        if(!id){
            throw ApiError.BadRequest(`No id was provided`)
        }
        const book = bookRepository.findOneBy({id})
        return {
            book
        }
    }

    async delete (id: number){
        if(!id){
            throw ApiError.BadRequest(`No id was provided`)
        }
        const type = bookRepository.delete({id})
        return {
            type
        }
    }

}

export default new BookService();