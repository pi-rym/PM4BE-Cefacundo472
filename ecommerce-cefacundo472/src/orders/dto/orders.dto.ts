import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Products } from '../../products/entities/products.entity';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'ID del usuario es requerido' })
  @IsUUID(4, { message: 'ID del usuario debe ser un UUID v4' })
  userId!: string;

  @IsArray({ message: 'La lista de productos debe ser un array' })
  @ArrayMinSize(1, { message: 'Debe haber al menos un producto' })
  products!: Partial<Products[]>;
}
