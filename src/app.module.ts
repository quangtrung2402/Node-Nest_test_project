import { Module } from '@nestjs/common';
import { AdminController, AppController, CatsController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AdminController, AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
