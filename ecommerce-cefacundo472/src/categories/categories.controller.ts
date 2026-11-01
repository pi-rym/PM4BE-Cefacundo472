import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

   @Get(':id')
   getCategoriesById(@Param('id') id:string){
    
    return this.categoriesService.getCategoriesById(id);
   }


  @Get('seeder')
  addCategories() {
    return this.categoriesService.addCategories();
  }
}
