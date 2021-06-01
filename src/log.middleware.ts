import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Start LoggerMiddleware::use()');
    console.log('Request...');
    console.log(req.ip, req.path, req.method);
    next();
    console.log('Response...');
  }
}

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Start logger()');
  console.log(`Request... at`, Date());
  next();
};