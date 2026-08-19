import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from '../categories/entity/categories.entity';
import { Products } from './entities/products.entity';
import { allProducts } from '../../utils/data';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private ormProductsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private ormCategoriesRepository: Repository<Categories>,
  ) {}

  async getAllProducts(page: number, limit: number): Promise<Products[]> {
    const skip = (page - 1) * limit;
    const products = await this.ormProductsRepository.find({
      relations: {
        category: true,
      },
      skip: skip,
      take: limit,
    });
    return products;
  }

  async addProducts(): Promise<string> {
    const categories = await this.ormCategoriesRepository.find();

    await Promise.all(
      allProducts.map(async (element) => {
        const category = categories.find(
          (category) => category.name === element.category,
        );

        if (!category)
          throw new NotFoundException(
            `La categoria ${element.category} no existe`,
          );

        const product = new Products();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.stock = element.stock;
        product.category = category;

        await this.ormProductsRepository
          .createQueryBuilder()
          .insert()
          .into(Products)
          .values(product)
          .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
          .execute();
      }),
    );

    return 'Productos agregados';
  }

  async getProductById(id: string): Promise<Products> {
    const product = await this.ormProductsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return product;
  }

  async updateProduct(id: string, productNewData: Products): Promise<Products> {
    const product = await this.ormProductsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(
        `Producto con id ${id} no encontrado para actualizar`,
      );
    }

    await this.ormProductsRepository.update(id, productNewData);

    return (await this.ormProductsRepository.findOneBy({ id }))!;
  }

  async deleteProduct(id: string): Promise<string> {
    const product = await this.ormProductsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(
        `Producto con id ${id} no encontrado para eliminar`,
      );
    }

    await this.ormProductsRepository.delete(id);
    return product.id;
  }
}
