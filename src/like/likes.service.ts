import { HttpException, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { PrismaService } from 'src/prisma';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(pyload: CreateLikeDto, userId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: pyload.productId },
    });
    if (!product) throw new HttpException('product not found', 400);

    return await this.prisma.like.create({
      data: {
        userId,
        productId: product.id,
      },
    });
  }

  async findAll(userId: string) {
    return await this.prisma.like.findMany({
      where: { userId },
    });
  }

  async findOne(id: string) {
    const like = await this.prisma.like.findUnique({ where: { id } });
    if (!like) throw new HttpException('like is not defined', 400);
    return like;
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.like.delete({ where: { id } });
  }
}
