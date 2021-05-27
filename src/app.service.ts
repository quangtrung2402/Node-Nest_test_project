import { Injectable } from '@nestjs/common';
import {Cat } from './cat.interface'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class CatService{
  private readonly cats: Cat[] = [];
  add(cat: Cat){
    this.cats.push(cat);
  }
  
  findAll(): Cat[]{
    return this.cats;
  }
}