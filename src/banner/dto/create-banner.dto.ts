import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBannerDto {
  @ApiProperty({ example: 'img.png' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({ example: 'img.png' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'img.png' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
