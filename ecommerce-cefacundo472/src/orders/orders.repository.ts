import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from './entities/orders.entity';
import { OrderDetails } from './entities/ordersdetails.entity';
import { Users } from '../users/entities/users.entity';
import { Products } from '../products/entities/products.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private ormOrdersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private ormOrderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Users)
    private ormUsersRepository: Repository<Users>,
    @InjectRepository(Products)
    private ormProductsRepository: Repository<Products>,
  ) {}

  async getOrderById(id: string): Promise<Orders> {
    const order = await this.ormOrdersRepository.findOne({
      where: { id },
      relations: {
        orderDetail: {
          products: true,
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Orden con id ${id} no encontrada`);
    }

    return order;
  }

  async addOrder(newOrderData: any): Promise<Orders> {
    const { userId, products } = newOrderData;

    const user = await this.ormUsersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${userId} no encontrado`);
    }

    const productsArray = await Promise.all(
      products.map(async (element: any) => {
        const product = await this.ormProductsRepository.findOneBy({
          id: element.id,
        });

        if (!product) {
          throw new NotFoundException(`Producto con id ${element.id} no encontrado`);
        }

        if (product.stock <= 0) {
          throw new BadRequestException(`El producto ${product.name} no tiene stock disponible`);
        }

        return product;
      }),
    );

    const order = new Orders();
    order.date = new Date();
    order.user = user;
    const newOrder = await this.ormOrdersRepository.save(order);

    await Promise.all(
      productsArray.map(async (product: any) => {
        await this.ormProductsRepository.update(
          { id: product.id },
          { stock: product.stock - 1 },
        );
      }),
    );

    const total = productsArray.reduce(
      (sum: number, product: any) => sum + Number(product.price),
      0,
    );

    const orderDetail = new OrderDetails();
    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.products = productsArray as Products[];
    orderDetail.order = newOrder;

    await this.ormOrderDetailsRepository.save(orderDetail);

    return (await this.ormOrdersRepository.findOne({
      where: { id: newOrder.id },
      relations: {
        orderDetail: {
          products: true,
        },
      },
    }))!;
  }
}