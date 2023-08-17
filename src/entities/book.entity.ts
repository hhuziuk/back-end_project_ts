import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {
    IsISBN,
    MaxLength,
    MinLength
} from "class-validator"
import {WishlistBook} from "./wishlist.book.entity";
import {Type} from "./type.entity";
import {Publisher} from "./publisher.entity";


@Entity('Book')
export class Book {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({nullable: false})
    @MaxLength(80, {
        message: 'name is too long',
    })
    public name: string;

    @Column({nullable: false})
    @MaxLength(80, {
        message: 'author\'s is too long',
    })
    public author: string;

    @Column({nullable: false})
    @MaxLength(100, {
        message: 'description is too long',
    })
    public description: string;

    @Column()
    public file: string;

    @Column({nullable: false})
    @IsISBN()
    public ISBN: string;

    @Column({nullable: false})
    public typeId: number;

    @Column({nullable: false})
    public publisherId: number;


    //
    @ManyToOne(() => Type, type => type.books)
    type: Type;

    @ManyToOne(() => Publisher, publisher => publisher.books)
    publisher: Publisher;

    @OneToMany(() => WishlistBook, wishlistBook => wishlistBook.book)
    wishlistBooks: WishlistBook[];

}
