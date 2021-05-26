import { Controller, Get, Req, Redirect, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller('cats')
export class CatsController {
  @Get()
  find(@Req() request: Request): string {
    console.log(request.url)
    return `This action returns a cat.<br>Request to ${request.url} from ${request.ip}`;
  }
  
  @Get('all')
  findAll(): string {
    return 'This action returns all cats';
  }
  
  // @Get('google')
  // @Redirect('https://google.com', 301)
  // getDocs() {}
  
  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
}

@Controller({ host: 'admin.localhost' })
export class AdminController {
  @Get()
  index(): string {
    return 'Admin page';
  }
}