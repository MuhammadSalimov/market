import { Module } from '@nestjs/common';
import { RaitingService } from './raiting.service';
import { RaitingController } from './raiting.controller';
import { PrismaService } from 'src/prisma';
import { OrderService } from 'src/order';

@Module({
  controllers: [RaitingController],
  providers: [RaitingService, PrismaService, OrderService],
})
export class RaitingModule {}
