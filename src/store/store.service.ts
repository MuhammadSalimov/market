import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from 'src/prisma';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}
  async create(pyload: CreateStoreDto) {
    await this.checkSeller(pyload.sellerId);
    const store = await this.prisma.store.create({
      data: pyload,
    });
    return store;
  }

  async findAll() {
    return await this.prisma.store.findMany();
  }

  async findOne(id: string) {
    const store = await this.prisma.store.findUnique({ where: { id } });
    if (!store)
      throw new HttpException('Store is not defined', HttpStatus.BAD_REQUEST);
    return store;
  }

  async update(id: string, pyload: UpdateStoreDto) {
    await this.findOne(id);
    if (pyload?.sellerId) {
      await this.checkSeller(pyload.sellerId);
    }
    const newStore = await this.prisma.store.update({
      where: { id },
      data: {
        ...pyload,
      },
    });
    return newStore;
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.store.delete({ where: { id } });
  }

  async checkSeller(sellerId: string) {
    const seller = await this.prisma.user.findUnique({
      where: { id: sellerId },
    });
    if (!seller)
      throw new HttpException('seller not found', HttpStatus.BAD_REQUEST);
    if (seller.role !== 'seller')
      throw new HttpException('role is not seller', HttpStatus.BAD_REQUEST);
  }
}
