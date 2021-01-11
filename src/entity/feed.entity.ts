import {
   Column,
   Entity,
   Generated,
   ManyToOne,
   PrimaryColumn,
   RelationId,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("feed")
export class FeedEntity {
   @PrimaryColumn()
   @Generated("uuid")
   id: string;

   @Column()
   description: string;

   @Column({ nullable: true })
   image: string;

   @Column()
   userId: string;

   @ManyToOne(() => UserEntity, (user) => user.feeds)
   user: Promise<UserEntity>;

   @ManyToOne(() => UserEntity, (user) => user.feeds)
   friend: Promise<UserEntity>;
}
