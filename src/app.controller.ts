import { Controller, Get, Req, Redirect, Body, Put, Param, Delete, HttpException, HttpStatus, UseFilters, Query, ParseIntPipe } from '@nestjs/common';
import { AppService, CatService } from './app.service';
import { Request } from 'express';
import { UpdateCatDto } from './app.dto';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    console.log('Create AppController');
  }
  
  @Get()
  getHello(): string {
    console.log('Start AppController::getHello()');
    return this.appService.getHello();
  }
}

@Controller('cats')
export class CatController {
  constructor(private readonly service: CatService){
    console.log('Create CatController');
  }
  
  @Get()
  @UseFilters(HttpExceptionFilter)
  find(@Req() request: Request): string {
    console.log('Start CatController::find()');
    console.log(request.url);
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'This is a custom message',
    }, HttpStatus.FORBIDDEN);
    return `This action returns a cat.<br>Request to ${request.url} from ${request.ip}`;
  }
  
  @Get('all')
  async findAll(@Query('id', ParseIntPipe) id: number) {
    console.log('Start CatController::findAll()');
    return this.service.find(id);
  }
  
  @Get('google')
  @Redirect('https://google.com', 301)
  getDocs() {
    console.log('Start CatController::getDocs()');
  }
  
  @Get(':id')
  findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
    console.log('Start CatController::findOne()');
    return `This action returns a #${id} cat`;
  }
  
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    console.log('Start CatController::update()');
    return `This action updates a #${id} cat`;
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log('Start CatController::remove()');
    return `This action removes a #${id} cat`;
  }
}

@Controller({ host: 'admin.localhost' })
export class AdminController {
  @Get()
  index(): string {
    console.log('Start AdminController::index()');
    return 'Admin page';
  }
}