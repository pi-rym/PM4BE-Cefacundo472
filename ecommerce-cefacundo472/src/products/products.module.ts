import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { Categories } from '../categories/entity/categories.entity';
import { Orders } from '../orders/entities/orders.entity';

@Module({
 
  imports: [TypeOrmModule.forFeature([Products, Categories, Orders])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [TypeOrmModule, ProductsService, ProductsRepository],
})
export class ProductsModule {}