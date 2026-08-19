import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from '../../categories/entity/categories.entity';
import { OrderDetails } from '../../orders/entities/ordersdetails.entity';

@Entity({
  name: 'PRODUCTS',
})
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  name!: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price!: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  stock!: number;

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
