import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AddFeedDto {
   @IsNotEmpty()
   @IsString()
   description: string;

   @IsOptional()
   @IsString()
   image: string;
}
