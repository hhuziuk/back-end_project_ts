import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import {Wishlist} from "./wishlist.entity";
import {Book} from "./book.entity";

@Entity('WishlistBook')
export class WishlistBook {
    @PrimaryGeneratedColumn()
    public id: number;


    @ManyToOne(() => Wishlist, basket => basket.wishlistBooks)
    wishlist: Wishlist;

    @ManyToOne(() => Book, book => book.wishlistBooks)
    book: Book;
}
