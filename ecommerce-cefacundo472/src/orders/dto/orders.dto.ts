import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Products } from '../../products/entities/products.entity';

export class CreateOrderDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID único del usuario en formato UUID v4',
  })
  @IsNotEmpty({ message: 'ID del usuario es requerido' })
  @IsUUID(4, { message: 'ID del usuario debe ser un UUID v4' })
  userId!: string;

  @ApiProperty({
    example: [{ id: '123e4567-e89b-12d3-a456-426614174000' }],
    description: 'Array de productos que conforman la orden, conteniendo al menos el ID de cada producto',
    type: [Object],
  })
  @IsArray({ message: 'La lista de productos debe ser un array' })
  @ArrayMinSize(1, { message: 'Debe haber al menos un producto' })
  products!: Partial<Products[]>;
}