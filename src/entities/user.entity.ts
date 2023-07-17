import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import {
    IsEmail,
    Max,
    Min,
    IsBoolean,
    IsString
} from "class-validator"


@Entity('User')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false, unique: true})
    @IsString()
    @Min(0)
    @Max(20)
    username: string;

    @Column({nullable: false})
    @IsString()
    @Min(8, {message: "password is too short"})
    @Max(32, {message: "password is too long"})
    password: string;

    @Column({nullable: false, unique: true})
    @IsString()
    @IsEmail()
    email: string;

    @Column({ default: false })
    @IsBoolean()
    isActivated: boolean;

    @Column()
    @IsString()
    activationLink: string;

}
