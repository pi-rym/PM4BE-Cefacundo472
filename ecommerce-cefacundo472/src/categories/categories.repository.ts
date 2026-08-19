import { allProducts } from '../../utils/data';
import { Categories } from './entity/categories.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private ormCategoriesRepository: Repository<Categories>,
  ) {}

  async getAllCategories(): Promise<Categories[]> {
    return await this.ormCategoriesRepository.find();
  }

  async addCategories(): Promise<string> {
    try {
      const insertPromises = allProducts.map((element) =>
        this.ormCategoriesRepository
          .createQueryBuilder()
          .insert()
          .into(Categories)
          .values({ name: element.category })
          .orIgnore()
          .execute(),
      );

      await Promise.all(insertPromises);

      return 'Categorias agregadas';
    } catch (error) {
      console.error('Error al precargar las categorías:', error);

      throw new InternalServerErrorException(
        'No se pudieron agregar las categorías',
      );
    }
  }
}
