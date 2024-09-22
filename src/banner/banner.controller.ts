import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { AuthGuard, CheckAdminGuard } from '@auth';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('banner')
@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}
  @ApiBearerAuth()
  @UseGuards(CheckAdminGuard)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() body: CreateBannerDto) {
    return this.bannerService.create(body);
  }

  @Get()
  findAll() {
    return this.bannerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannerService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseGuards(CheckAdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto) {
    return this.bannerService.update(id, updateBannerDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseGuards(CheckAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannerService.remove(id);
  }
}
