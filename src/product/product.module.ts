import { Module } from '@nestjs/common';

import { ProductController } from './product.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
