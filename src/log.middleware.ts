import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    console.log(req.ip, req.path, req.method);
    next();
    console.log('Response...');
    // console.log(res);
  }
}

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request... at`, Date());
  next();
};