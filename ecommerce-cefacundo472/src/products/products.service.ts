import { Injectable } from '@nestjs/common';
import { Product, ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository:ProductsRepository) {}
   
     getAllProducts(): Product[] {
       return this.productsRepository.getAllProducts();
     }

}
 