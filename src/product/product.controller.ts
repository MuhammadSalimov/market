import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { AuthGuard, CheckSellerGuard } from 'src/auth';

@ApiBearerAuth()
@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productservice: ProductService) {}

  @UseGuards(CheckSellerGuard)
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() pyload: CreateProductDto, @Req() req: Request) {
    const userId = req.user?.id || ' ';
    return this.productservice.create(pyload, userId);
  }

  @Get('all')
  async findAll() {
    return this.productservice.findAll();
  }

  @UseGuards(CheckSellerGuard)
  @UseGuards(AuthGuard)
  @Get('byStore')
  async findByStore(@Req() req: Request) {
    const userId = req.user?.id || ' ';
    return this.productservice.findByStore(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.productservice.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Unexpected error');
    }
  }

  @UseGuards(CheckSellerGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateProductDto,
    @Req() req: Request,
  ) {
    try {
      const userId = req.user?.id;
      return await this.productservice.update(id, updateTaskDto, userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Unexpected error');
    }
  }

  @UseGuards(CheckSellerGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    try {
      return await this.productservice.remove(id, req.user.id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Unexpected error');
    }
  }
}
