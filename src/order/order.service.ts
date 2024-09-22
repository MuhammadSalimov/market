import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  async create(pyload: CreateOrderDto, userId: string) {
    const order = await this.prisma.order.create({
      data: {
        ...pyload,
        userId,
      },
    });
    return order;
  }

  async findAll(id: string) {
    const orders = await this.prisma.order.findMany({
      where: { userId: id },
      include: { OrderItem: true },
    });
    return orders;
  }

  async findOne(id: string) {
    const findOrder = await this.prisma.order.findUnique({
      where: { id },
    });
    if (!findOrder)
      throw new HttpException('Order not found', HttpStatus.BAD_REQUEST);

    return findOrder;
  }

  async update(id: string, pyload: UpdateOrderDto, userId: string) {
    const order = await this.findOne(id);
    if (order.userId != userId)
      throw new HttpException(
        'can only be changed by the owner',
        HttpStatus.BAD_REQUEST,
      );
    const updated = await this.prisma.order.update({
      where: { id },
      data: { ...pyload, userId },
    });
    return updated;
  }

  async remove(id: string, userId: string) {
    const order = await this.findOne(id);
    if (order.userId != userId)
      throw new HttpException(
        'can only be changed by the owner',
        HttpStatus.BAD_REQUEST,
      );
    return await this.prisma.order.delete({ where: { id } });
  }
}
