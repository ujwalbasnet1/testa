import {
   ArgumentsHost,
   Catch,
   ExceptionFilter,
   HttpException,
   HttpStatus,
} from "@nestjs/common";
import { QueryFailedError } from "typeorm";

@Catch()
export class GlobalExceptionHandler implements ExceptionFilter {
   catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();

      const status =
         exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

      if (exception instanceof HttpException) {
         response.status(status).json({
            message: exception.message,
            errors:
               exception?.getResponse()["message"] != null
                  ? exception?.getResponse()["message"]
                  : exception?.getResponse(),
         });
      } else if (exception instanceof QueryFailedError) {
         response.status(400).json({
            message: exception.name,
            errors: [exception.message],
         });
      } else {
         response.status(status).json({
            error: exception.toString(),
         });
      }
   }
}
