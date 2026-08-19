import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/orders.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  getOrderById(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrderById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  addOrder(@Body() newOrderData: CreateOrderDto) {
    return this.ordersService.addOrder(newOrderData);
  }
}
