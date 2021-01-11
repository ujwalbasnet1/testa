import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { UserModule } from "../users/user.module";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";

@Module({
   imports: [
      UserModule,
      JwtModule.register({
         secret: jwtConstants.secret,
      }),
   ],
   controllers: [AuthController],
   providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
