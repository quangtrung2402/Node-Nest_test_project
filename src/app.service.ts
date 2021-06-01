import { Injectable } from '@nestjs/common';
import {Cat } from './cat.interface'

@Injectable()
export class AppService {
  getHello(): string {
    console.log('Start AppService::getHello()');
    return 'Hello World!';
  }
}

@Injectable()
export class CatService{
  private readonly cats: Cat[] = [];

  constructor(){
    console.log('Create CatService');
  }

  add(cat: Cat){
    console.log('Start CatService::add()');
    this.cats.push(cat);
  }
  
  findAll(): Cat[]{
    console.log('Start CatService::findAll()');
    return this.cats;
  }
  
  find(id: number): string{
    console.log('Start CatService::find()');
    return `find number ${id} from CatServices`;
  }
}