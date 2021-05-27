import { Module } from '@nestjs/common';
import { AdminController, AppController, CatController } from './app.controller';
import { AppService, CatService } from './app.service';

@Module({
  imports: [],
  controllers: [AdminController, AppController, CatController],
  providers: [AppService, CatService],
})
export class AppModule {}
