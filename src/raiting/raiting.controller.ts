import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RaitingService } from './raiting.service';
import { CreateRaitingDto } from './dto/create-raiting.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@auth';
import { Request } from 'express';
@ApiTags('raiting')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('raiting')
export class RaitingController {
  constructor(private readonly raitingService: RaitingService) {}

  @Post()
  create(@Body() body: CreateRaitingDto, @Req() req: Request) {
    const userId = req.user.id;
    return this.raitingService.create(body, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.raitingService.remove(id, req.user.id);
  }
}
