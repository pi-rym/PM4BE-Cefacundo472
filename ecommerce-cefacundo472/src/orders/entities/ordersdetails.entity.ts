import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from './orders.entity';
import { Products } from '../../products/entities/products.entity';

@Entity({
  name: 'ORDER_DETAILS',
})
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price!: number;

  @OneToOne(() => Orders, (order) => order.orderDetail)
  @JoinColumn({ name: 'order_id' })
  order!: Orders;

  @ManyToMany(() => Products, (product) => product.orderDetails)
  @JoinTable({
    name: 'ORDERDETAILS_PRODUCTS',
    joinColumn: {
      name: 'order_detail_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  products!: Products[];
}
