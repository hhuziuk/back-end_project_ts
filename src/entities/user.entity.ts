import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import {
    IsEmail,
    MaxLength,
    MinLength
} from "class-validator"


@Entity('User')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false, unique: true})
    @MinLength(1, {
        message: 'username is too short',
    })
    @MaxLength(15, {
        message: 'username is too long',
    })
    username: string;

    @Column({nullable: false})
    @MinLength(4, {
        message: 'password is too short',
    })
    @MaxLength(15, {
        message: 'password is too long',
    })
    password: string;

    @Column({nullable: false, unique: true})
    @IsEmail()
    email: string;

    @Column({ default: false })
    isActivated: boolean;

    @Column()
    activationLink: string;

}
