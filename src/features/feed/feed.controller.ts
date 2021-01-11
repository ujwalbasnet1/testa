import {
   Body,
   Controller,
   Delete,
   Get,
   Param,
   Patch,
   Post,
   Req,
   UseGuards,
} from "@nestjs/common";
import { AddFeedDto } from "./models/addFeed.dto";
import { FeedService } from "./feed.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { FeedEntity } from "../../entity/feed.entity";

@UseGuards(JwtAuthGuard)
@Controller("feeds")
export class FeedController {
   constructor(private readonly feedService: FeedService) {}

   @Get("/my")
   getMyPostedFeeds(@Req() req): Promise<Array<FeedEntity>> {
      return this.feedService.getFeedsById(req.user.id);
   }

   @Post()
   addFeed(@Body() feed: AddFeedDto, @Req() req) {
      return this.feedService.addFeed(req.user.id, feed);
   }

   @Patch(":id")
   updateFeed(@Body() feed: AddFeedDto, @Param("id") id: string) {
      return this.feedService.updateFeedById(id, feed);
   }

   @Delete(":id")
   deleteFeed(@Param("id") id: string) {
      return this.feedService.deleteFeedById(id);
   }
}
