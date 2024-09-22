import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AddRoleService } from './add-role.service';
import { CreateAddRoleDto } from './dto/create-add-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard, CheckAdminGuard } from '@auth';

@UseGuards(CheckAdminGuard)
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('add-role')
@Controller('add-role')
export class AddRoleController {
  constructor(private readonly addRoleService: AddRoleService) {}
  @Post()
  async create(@Body() body: CreateAddRoleDto) {
    return await this.addRoleService.create(body);
  }
}
