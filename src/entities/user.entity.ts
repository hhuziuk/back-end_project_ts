import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
import {
    IsEmail,
    MaxLength,
    MinLength
} from "class-validator"
import {Wishlist} from "./wishlist.entity";


@Entity('User')
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({nullable: false, unique: true})
    @MinLength(1, {
        message: 'username is too short',
    })
    @MaxLength(50, {
        message: 'username is too long',
    })
    public username: string;

    @Column({nullable: false})
    @MinLength(4, {
        message: 'password is too short',
    })
    @MaxLength(50, {
        message: 'password is too long',
    })
    public password: string;

    @Column({nullable: false, unique: true})
    @IsEmail()
    public email: string;

    @Column({ default: false })
    public isActivated: boolean;

    @Column()
    public activationLink: string;

    @Column({ default: "USER" })
    public role: string;

    @OneToOne(() => Wishlist)
    wishlist: Wishlist;
}
