import { Module } from '@nestjs/common';
import { AddRoleService } from './add-role.service';
import { AddRoleController } from './add-role.controller';
import { PrismaModule, PrismaService } from 'src/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [AddRoleController],
  providers: [AddRoleService, PrismaService],
})
export class AddRoleModule {}
