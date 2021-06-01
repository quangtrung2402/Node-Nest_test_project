import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('Start HttpExceptionFilter::catch()');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    
    const responseJson = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    };
    
    console.log(exception);
    
    response
    .status(status)
    .json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}