import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';
import { AdminController, AppController, CatController } from './app.controller';
import { AppService, CatService } from './app.service';
import { logger, LoggerMiddleware } from './log.middleware';

@Module({
  imports: [],
  controllers: [AdminController, AppController, CatController],
  providers: [AppService, CatService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware)
    .forRoutes(
      { path: 'cats', method: RequestMethod.GET },
      { path: 'cats', method: RequestMethod.POST });
      
      consumer.apply(logger).forRoutes({path:'',method:RequestMethod.ALL});
    }
    
  }
