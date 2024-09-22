import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAddRoleDto, UserDto } from './dto/create-add-role.dto';
import { PrismaService } from 'src/prisma';

@Injectable()
export class AddRoleService {
  constructor(private readonly prisma: PrismaService) {}
  async create(pyload: CreateAddRoleDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: pyload.userId },
    });
    if (!user)
      throw new HttpException('user is not defined', HttpStatus.BAD_REQUEST);
    const newUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        role: pyload.role,
      },
    });

    return new UserDto(newUser);
  }
}
