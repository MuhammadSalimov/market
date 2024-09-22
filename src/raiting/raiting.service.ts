import { HttpException, Injectable } from '@nestjs/common';
import { CreateRaitingDto } from './dto/create-raiting.dto';
import { PrismaService } from 'src/prisma';
import { OrderService } from 'src/order';

@Injectable()
export class RaitingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly order: OrderService,
  ) {}
  async create(pyload: CreateRaitingDto, userId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: pyload.productId },
      include: {
        OrderItem: true,
      },
    });
    if (!product) throw new HttpException('product is not defined', 400);
    if (product.OrderItem.length < 1)
      throw new HttpException('unpurchased product', 400);
    const checkOrder = await this.prisma.order.findMany({
      where: { userId, OrderItem: { some: { productId: product.id } } },
    });
    if (!checkOrder) throw new HttpException('unpurchased product', 400);
    return await this.prisma.rating.create({
      data: {
        ...pyload,
        userId,
      },
    });
  }

  async remove(id: string, userId: string) {
    const raiting = await this.prisma.rating.findUnique({ where: { id } });
    if (raiting.userId != userId)
      throw new HttpException('only the author can delete', 400);
    return await this.prisma.rating.delete({ where: { id } });
  }
}
