import { ArrayNotEmpty, IsArray, IsNotEmpty } from "class-validator";

export class AddFriendDto {
   @IsArray()
   @ArrayNotEmpty()
   users: Array<string>;
}
