import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Categories } from '../../categories/entity/categories.entity';
import { OrderDetails } from '../../orders/entities/ordersdetails.entity';

@Entity({
  name: 'PRODUCTS',
})
export class Products {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Identificador único en formato UUID',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    example: 'iPhone 15 Pro',
    description: 'Nombre del producto (máximo 50 caracteres)',
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  name!: string;

  @ApiProperty({
    example: 'Smartphone de última generación con carcasa de titanio',
    description: 'Descripción detallada del producto',
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  description!: string;

  @ApiProperty({
    example: 999.99,
    description: 'Precio con precisión de 10 dígitos y 2 decimales',
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price!: number;

  @ApiProperty({
    example: 50,
    description: 'Cantidad disponible en stock',
  })
  @Column({
    type: 'int',
    nullable: false,
  })
  stock!: number;

  @ApiProperty({
    example: 'https://via.placeholder.com/150',
    description: 'URL de la imagen del producto',
    required: false,
  })
  @Column({
    type: 'varchar',
    nullable: true,
    default: 'https://via.placeholder.com/150',
  })
  imgUrl!: string;

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category!: Categories;

  @ManyToMany(() => OrderDetails, (orderDetail) => orderDetail.products)
  orderDetails!: OrderDetails[];
}