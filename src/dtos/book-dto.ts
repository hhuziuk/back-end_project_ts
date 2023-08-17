
export default class BookDto {
    name: string;
    author: string;
    description: string;
    file: string;
    ISBN: string;
    typeId: number;
    publisherId: number;
    constructor(model: {name: string, author: string, description: string, file: string, ISBN: string,
        typeId: number, publisherId: number}){
        this.name = model.name;
        this.author = model.author;
        this.description = model.description;
        this.file = model.file;
        this.ISBN = model.ISBN;
        this.typeId = model.typeId;
        this.publisherId = model.publisherId;
    }
}
