import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable} from "typeorm";
import {
    MaxLength,
    MinLength
} from "class-validator"
import {Book} from "./book.entity";
import {Publisher} from "./publisher.entity";


@Entity('Type')
export class Type {
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

    @OneToMany(() => Book, book => book.type)
    books: Book[];

    @ManyToMany(() => Publisher, publisher => publisher.types)
    @JoinTable()
    publishers: Publisher[];
}
