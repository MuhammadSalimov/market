import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@auth';
import { UpdateStoreParams } from 'src/types';

@ApiTags('like')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  create(@Body() pyload: CreateLikeDto, @Req() req: Request) {
    const userId = req.user.id;
    return this.likesService.create(pyload, userId);
  }

  @Get()
  findAll(@Req() req: Request) {
    const userId = req.user.id;
    return this.likesService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param() params: UpdateStoreParams) {
    return this.likesService.findOne(params.id);
  }

  @Delete(':id')
  remove(@Param() params: UpdateStoreParams) {
    return this.likesService.remove(params.id);
  }
}
