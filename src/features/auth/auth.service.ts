import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../users/user.service";
import hashPassword from "./hashPassword";
import { LoginDto } from "./models/login.dto";
import { RegisterDto } from "./models/register.dto";

@Injectable()
export class AuthService {
   constructor(
      private readonly usersService: UserService,
      private readonly jwtService: JwtService
   ) {}

   async login(user: LoginDto) {
      const retrieved = await this.usersService.findByEmail(user.email);

      if (!retrieved)
         throw new UnauthorizedException(
            "No account was found associated to that email."
         );

      if (retrieved.password !== hashPassword(user.password))
         throw new UnauthorizedException("Email and password did not match.");

      const payload = { email: user.email, id: retrieved.id };

      return {
         access_token: this.jwtService.sign(payload),
      };
   }

   signup(user: RegisterDto) {
      return this.usersService.register(user);
   }
}
