import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./features/auth/auth.module";
import { UserEntity } from "./entity/user.entity";
import { FeedEntity } from "./entity/feed.entity";
import { FeedModule } from "./features/feed/feed.module";

@Module({
   imports: [
      TypeOrmModule.forRoot({
         type: "mysql",
         host: "localhost",
         port: 3306,
         username: "pachisochamla",
         password: "pachisochamla",
         database: "pachisochamla",
         entities: [UserEntity, FeedEntity],
         synchronize: true,
      }),
      AuthModule,
      FeedModule,
   ],
   controllers: [],
   providers: [],
})
export class AppModule {}
