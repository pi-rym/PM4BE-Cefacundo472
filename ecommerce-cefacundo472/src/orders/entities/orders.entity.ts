import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { OrderDetails } from './ordersdetails.entity';

@Entity({
  name: 'ORDERS',
})
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  date!: Date;

  @ManyToOne(() => Users, (user) => user.orders)
  user!: Users;

  @OneToOne(() => OrderDetails, (orderDetail) => orderDetail.order)
  orderDetail!: OrderDetails;
}
