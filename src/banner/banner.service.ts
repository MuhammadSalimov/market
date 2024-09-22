import { HttpException, Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { PrismaService } from 'src/prisma';

@Injectable()
export class BannerService {
  constructor(private readonly prisma: PrismaService) {}
  async create(pyload: CreateBannerDto) {
    return await this.prisma.banner.create({ data: pyload });
  }

  async findAll() {
    return await this.prisma.banner.findMany();
  }

  async findOne(id: string) {
    const banner = await this.prisma.banner.findUnique({ where: { id } });
    if (!banner) throw new HttpException('banner not found', 400);
    return banner;
  }

  async update(id: string, pyload: UpdateBannerDto) {
    await this.findOne(id);
    return await this.prisma.banner.update({ where: { id }, data: pyload });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.banner.delete({ where: { id } });
  }
}
