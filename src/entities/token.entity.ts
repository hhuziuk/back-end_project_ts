import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
import {User} from "./user.entity"

@Entity('Token')
export class Token {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(() => User)
    @JoinColumn()
    public user: User;

    @Column({nullable: false})
    public refreshToken: string;
}