import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(pyload: CreateProductDto, userId: string) {
    await this.checkPyload(pyload.categoryId, pyload.storeId, userId);
    const product = await this.prisma.product.create({ data: pyload });
    return product;
  }

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findByStore(userId: string) {
    return this.prisma.product.findMany({
      where: { store: { sellerId: userId } },
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, pyload: UpdateProductDto, userId: string) {
    const findStore = await this.findOne(id);
    const categoryId = pyload.categoryId || findStore.categoryId;
    const storeId = pyload.storeId || findStore.storeId;
    await this.checkPyload(categoryId, storeId, userId);

    return await this.prisma.product.update({
      where: { id },
      data: pyload,
    });
  }

  async remove(id: string, userId: string) {
    const findStore = await this.findOne(id);
    await this.checkPyload(findStore.categoryId, findStore.storeId, userId);
    return await this.prisma.product.delete({
      where: { id: findStore.id },
    });
  }

  async checkPyload(categoryId: string, storeId: string, userId: string) {
    const findCategory = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!findCategory) throw new NotFoundException(`CategoryId not found`);

    const store = await this.prisma.store.findUnique({
      where: { id: storeId },
      select: {
        name: true,
        user: { select: { id: true } },
      },
    });
    if (!store) throw new NotFoundException('Store not found');

    if (store.user.id != userId)
      throw new HttpException(
        'You can only add products to your store',
        HttpStatus.BAD_REQUEST,
      );
  }
}
