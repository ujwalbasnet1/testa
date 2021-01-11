import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./models/login.dto";
import { RegisterDto } from "./models/register.dto";

@Controller("auth")
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post("login")
   login(@Body() user: LoginDto) {
      return this.authService.login(user);
   }

   @Post("signup")
   signup(@Body() user: RegisterDto) {
      return this.authService.signup(user);
   }
}
