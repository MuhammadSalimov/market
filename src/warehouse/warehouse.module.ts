import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { PrismaService } from 'src/prisma';
import { ProductService } from 'src/product';

@Module({
  controllers: [WarehouseController],
  providers: [WarehouseService, PrismaService, ProductService],
})
export class WarehouseModule {}
