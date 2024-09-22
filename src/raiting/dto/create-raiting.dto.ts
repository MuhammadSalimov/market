import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateRaitingDto {
  @ApiProperty({ example: '30e72241-9e62-4dc3-bf5c-d9324b3787c9' })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({ example: 1 })
  @Min(0)
  @Max(5)
  @IsInt()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({ example: 'review', required: false })
  @IsOptional()
  @IsString()
  review?: string;
}
