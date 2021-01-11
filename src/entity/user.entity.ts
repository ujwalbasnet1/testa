import {
   BeforeInsert,
   Column,
   Entity,
   Generated,
   JoinTable,
   ManyToMany,
   OneToMany,
   PrimaryColumn,
   Unique,
} from "typeorm";
import { Exclude } from "class-transformer";
import { FeedEntity } from "./feed.entity";
import hashPassword from "../features/auth/hashPassword";

@Unique(["email"])
@Entity("user")
export class UserEntity {
   @PrimaryColumn() @Generated("uuid") id: string;

   @Column() firstName: string;

   @Column() lastName: string;

   @Column({ nullable: true }) age: number;

   @Column() email: string;

   @Exclude()
   @Column()
   password: string;

   @OneToMany(() => FeedEntity, (feed) => feed.user)
   feeds: Promise<Array<FeedEntity>>;

   @OneToMany(() => FeedEntity, (feed) => feed.friend)
   friendsFeeds: Promise<Array<FeedEntity>>;

   @ManyToMany(() => UserEntity)
   @JoinTable()
   friends: Promise<Array<UserEntity>>;

   // @BeforeInsert()
   // hashPasswordBeforeInsert() {
   //    this.password = hashPassword(this.password);
   //    console.log(this.password);
   // }
}
