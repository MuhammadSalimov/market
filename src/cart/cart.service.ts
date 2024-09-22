import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/prisma';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}
  async create(userId: string, body: CreateCartDto) {
    return await this.prisma.cart.create({ data: { ...body, userId } });
  }

  async findAll(userId: string) {
    return await this.prisma.cart.findMany({ where: { userId } });
  }

  async findOne(id: string) {
    const findCart = await this.prisma.cart.findUnique({ where: { id } });
    if (!findCart)
      throw new HttpException('cart is not defined', HttpStatus.BAD_REQUEST);
    return findCart;
  }

  async update(id: string, userId: string, body: UpdateCartDto) {
    const cart = await this.findOne(id);
    if (cart.userId != userId)
      throw new HttpException('user is not author', 400);

    return await this.prisma.cart.update({
      where: { id },
      data: { ...body },
    });
  }

  async remove(id: string, userId: string) {
    const cart = await this.findOne(id);
    if (cart.userId !== userId)
      throw new HttpException("can't delete you", 400);
    return await this.prisma.cart.delete({
      where: { id },
    });
  }
}
