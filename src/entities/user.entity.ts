import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, ObjectType} from "typeorm";
import {
    IsEmail,
    MaxLength,
    MinLength
} from "class-validator"


@Entity('User')
export class User {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({nullable: false, unique: true})
    @MinLength(1, {
        message: 'username is too short',
    })
    @MaxLength(15, {
        message: 'username is too long',
    })
    public username: string;

    @Column({nullable: false})
    @MinLength(4, {
        message: 'password is too short',
    })
    @MaxLength(15, {
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

    @Column({nullable: false})
    public role: string;
}
