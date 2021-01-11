import {
   IsEmail,
   IsNotEmpty,
   IsNumber,
   IsOptional,
   MinLength,
} from "class-validator";

export class RegisterDto {
   @IsNotEmpty()
   firstName: string;

   @IsNotEmpty()
   lastName: string;

   @IsOptional()
   @IsNumber()
   age: number;

   @IsEmail()
   email: string;

   @MinLength(6)
   password: string;
}
