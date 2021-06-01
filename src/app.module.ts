import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
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
    console.log('Start AppModule::configure()');
    consumer
    .apply(LoggerMiddleware, logger)
    .forRoutes(
      { path: 'cats', method: RequestMethod.GET },
      { path: 'cats', method: RequestMethod.POST });
    }
  }
