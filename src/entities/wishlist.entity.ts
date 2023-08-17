import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany} from "typeorm";
import {User} from "./user.entity";
import {WishlistBook} from "./wishlist.book.entity";

@Entity('Wishlist')
export class Wishlist {
    @PrimaryGeneratedColumn()
    public id: number;

    //

    @OneToMany(() => WishlistBook, wishlistBook => wishlistBook.wishlist)
    wishlistBooks: WishlistBook[];

    @OneToOne(() => User, user => user.wishlist)
    user: User;
}
