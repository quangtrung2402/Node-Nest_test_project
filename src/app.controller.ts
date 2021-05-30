import { Controller, Get, Req, Redirect, Body, Put, Param, Delete, HttpException, HttpStatus, BadRequestException, UseFilters } from '@nestjs/common';
import { AppService, CatService } from './app.service';
import { Request } from 'express';
import { UpdateCatDto } from './app.dto';
import { Cat } from './cat.interface';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller('cats')
export class CatController {
  constructor(private readonly service: CatService){}
  
  @Get()
  @UseFilters(HttpExceptionFilter)
  find(@Req() request: Request): string {
    console.log(request.url)
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'This is a custom message',
    }, HttpStatus.FORBIDDEN);
    return `This action returns a cat.<br>Request to ${request.url} from ${request.ip}`;
  }
  
  @Get('all')
  async findAll(): Promise<Cat[]> {
    throw new BadRequestException;
    return this.service.findAll();
  }
  
  @Get('google')
  @Redirect('https://google.com', 301)
  getDocs() {}
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }
  
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}

@Controller({ host: 'admin.localhost' })
export class AdminController {
  @Get()
  index(): string {
    return 'Admin page';
  }
}