import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PrismaService } from 'src/prisma';

@Injectable()
export class OrderItemService {
  constructor(private readonly prisma: PrismaService) {}
  async create(userId: string, body: CreateOrderItemDto) {
    await this.checkOrder(body.orderId, body.productId, userId);
    const orderItem = await this.prisma.orderItem.create({
      data: body,
    });
    return orderItem;
  }

  async findOne(id: string) {
    const orderItem = await this.prisma.orderItem.findUnique({
      where: { id },
    });
    if (!orderItem)
      throw new HttpException(
        'orderItem is not defined',
        HttpStatus.BAD_REQUEST,
      );
    return orderItem;
  }

  async update(id: string, userId: string, body: UpdateOrderItemDto) {
    const findOrderItem = await this.findOne(id);
    const orderId = body.orderId || findOrderItem.orderId;
    const productId = body.productId || findOrderItem.productId;
    await this.checkOrder(orderId, productId, userId);

    return await this.prisma.orderItem.update({
      where: { id },
      data: body,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.orderItem.delete({
      where: { id },
    });
  }

  async checkOrder(orderId: string, productId: string, userId: string) {
    const findOrder = await this.prisma.order.findUnique({
      where: { id: orderId },
      select: {
        user: { select: { id: true } },
      },
    });
    if (!findOrder)
      throw new HttpException('order is not defined', HttpStatus.BAD_REQUEST);

    if (findOrder.user.id != userId)
      throw new HttpException('user is not Author', HttpStatus.BAD_REQUEST);
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product)
      throw new HttpException('Product is not defined', HttpStatus.BAD_REQUEST);
  }
}
