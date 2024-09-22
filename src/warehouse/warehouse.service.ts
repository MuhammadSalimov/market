import { HttpException, Injectable } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { PrismaService } from 'src/prisma';
import { ProductService } from 'src/product';

@Injectable()
export class WarehouseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly product: ProductService,
  ) {}
  async create(pyload: CreateWarehouseDto) {
    await this.product.findOne(pyload.productId);
    await this.udpateProduct(pyload.productId, pyload.quantity);
    return await this.prisma.warehouse.create({ data: pyload });
  }

  async findAll() {
    return await this.prisma.warehouse.findMany();
  }

  async findOne(id: string) {
    const warehouse = await this.prisma.warehouse.findUnique({ where: { id } });
    if (!warehouse) throw new HttpException('warehouse not found', 400);
    return warehouse;
  }

  async update(id: string, body: UpdateWarehouseDto) {
    const findWarehouse = await this.findOne(id);
    const productId = body.productId || findWarehouse.productId;
    const quantity = body.quantity || findWarehouse.quantity;
    await this.udpateProduct(productId, quantity);
    return await this.prisma.warehouse.update({
      where: { id },
      data: body,
    });
  }

  async remove(id: string) {
    const findWarehouse = await this.findOne(id);
    await this.udpateProduct(findWarehouse.productId, 0);
    return await this.prisma.warehouse.delete({ where: { id } });
  }

  async udpateProduct(id: string, stock: number) {
    await this.prisma.product.update({
      where: { id },
      data: {
        stock,
      },
    });
  }
}
