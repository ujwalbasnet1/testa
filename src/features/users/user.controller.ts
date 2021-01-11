import {
   Body,
   Controller,
   Get,
   Param,
   Post,
   Req,
   UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserService } from "./user.service";
import { UserEntity } from "../../entity/user.entity";
import { AddFriendDto } from "./models/addFriend.dto";
import { FeedEntity } from "../../entity/feed.entity";

@UseGuards(JwtAuthGuard)
@Controller("users")
export class UserController {
   constructor(private readonly userService: UserService) {}

   @Get("")
   getUsers(): Promise<Array<UserEntity>> {
      return this.userService.getUsers();
   }

   @Post("/friends")
   addFriends(@Body() friends: AddFriendDto, @Req() req) {
      return this.userService.addFriends(req.user.id, friends);
   }

   @Get("/feeds")
   getFeeds(@Req() req) {
      return this.userService.getAllFeedsOf(req.user.id);
   }
}
