import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { FeedEntity } from "../../entity/feed.entity";
import { Connection, Repository } from "typeorm";
import { AddFeedDto } from "./models/addFeed.dto";
import { UserService } from "../users/user.service";
import { UserEntity } from "../../entity/user.entity";

@Injectable()
export class FeedService {
   constructor(
      private readonly connection: Connection,
      @InjectRepository(FeedEntity)
      private readonly feedRepository: Repository<FeedEntity>,
      private readonly userService: UserService
   ) {}

   async addFeed(userId: string, feedDto: AddFeedDto) {
      let feed = new FeedEntity();

      feed.description = feedDto.description;
      if (feedDto.image) feed.image = feedDto.image;
      feed.userId = userId;

      let userFriends = await this.userService.findFriendsOf(userId);

      let queryRunner = this.connection.createQueryRunner();

      // lets now open a new transaction:
      await queryRunner.startTransaction();

      try {
         for (const friend of userFriends) {
            friend.friendsFeeds = Promise.resolve([
               feed,
               ...(await friend.friendsFeeds),
            ]);

            await queryRunner.manager.save<UserEntity>(friend);
            await queryRunner.manager.save<FeedEntity>(feed);
         }
      } catch (err) {
         await queryRunner.rollbackTransaction();
      } finally {
         await queryRunner.release();
      }

      return feed;
   }

   updateFeedById(feedId: string, feedDto: AddFeedDto) {
      return this.feedRepository.update(feedId, {
         description: feedDto.description,
         image: feedDto.image,
      });
   }

   deleteFeedById(id: string) {
      return this.feedRepository.delete(id);
   }

   getFeedsById(userId: string): Promise<Array<FeedEntity>> {
      return this.feedRepository.find({ userId: userId });
   }
}
