import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../../entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterDto } from "../auth/models/register.dto";
import hashPassword from "../auth/hashPassword";
import { AddFriendDto } from "./models/addFriend.dto";

@EntityRepository(UserEntity)
export class UserService {
   constructor(
      @InjectRepository(UserEntity)
      private readonly repository: Repository<UserEntity>
   ) {}

   register(requestUser: RegisterDto) {
      requestUser.password = hashPassword(requestUser.password);
      return this.repository.insert(requestUser);
   }

   findById(id: string): Promise<UserEntity> {
      return this.repository.findOne({ id });
   }

   findByEmail(email: string): Promise<UserEntity> {
      return this.repository.findOne({ email });
   }

   getUsers(): Promise<Array<UserEntity>> {
      return this.repository.find();
   }

   addFriends(userId: string, friends: AddFriendDto) {
      return this.repository
         .createQueryBuilder()
         .relation(UserEntity, "friends")
         .of(userId)
         .add(
            friends.users.map((u) => {
               let user = new UserEntity();
               user.id = u;
               return user;
            })
         );
   }

   getAllFeedsOf(userId: string) {
      return this.repository.find({
         where: { id: userId },
         relations: ["feeds", "friendsFeeds"],
      });
   }

   async findFriendsOf(userId: string) {
      let user: UserEntity = await this.repository.findOne({
         where: { id: userId },
         relations: ["friends"],
      });

      return await user.friends;
   }
}
