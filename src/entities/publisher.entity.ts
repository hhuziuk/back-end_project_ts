import {Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany, OneToMany} from "typeorm";
import {
    MaxLength,
    MinLength
} from "class-validator"
import {Type} from "./type.entity";
import {Book} from "./book.entity";


@Entity('Publisher')
export class Publisher {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({nullable: false, unique: true})
    @MinLength(1, {
        message: 'name is too short',
    })
    @MaxLength(50, {
        message: 'name is too long',
    })
    public name: string;

    //

    @OneToMany(() => Book, book => book.publisher)
    books: Book[];

    @ManyToMany(() => Type, type => type.publishers)
    types: Type[];

}
