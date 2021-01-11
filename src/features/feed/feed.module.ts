import { Module } from "@nestjs/common";
import { FeedController } from "./feed.controller";
import { FeedService } from "./feed.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FeedEntity } from "../../entity/feed.entity";
import { UserModule } from "../users/user.module";

@Module({
   imports: [TypeOrmModule.forFeature([FeedEntity]), UserModule],
   controllers: [FeedController],
   providers: [FeedService],
})
export class FeedModule {}
