import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'd2e45678-bf7e-432a-b23d-8c57f8e675d3',
  })
  @IsUUID()
  storeId: string;

  @ApiProperty({
    example: '5d8c4660-7bdf-4fbb-8e52-a68d598fcbe1',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiProperty({
    example: 'Smartphone XYZ',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'This is a high-quality smartphone with the latest features.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 299.99,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'https://example.com/images/product.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
