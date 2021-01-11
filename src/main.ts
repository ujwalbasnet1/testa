import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { GlobalExceptionHandler } from "./errorhandler.global";

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

   // for @MaxLength(), @IsInt(), ...etc validation from class validator
   app.useGlobalPipes(new ValidationPipe());

   // custom global exception handler
   app.useGlobalFilters(new GlobalExceptionHandler());

   // @Expose, @Exclude from class-validator works
   app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector))
   );

   await app.listen(3000);
}

bootstrap().then((r) => {
   console.log("Server Started at http://localhost:3000/");
});
