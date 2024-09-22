import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateStoreDto {
  @ApiProperty({
    example: 'My Awesome Store',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'd2e45678-bf7e-432a-b23d-8c57f8e675d3',
  })
  @IsUUID()
  sellerId: string;

  @ApiProperty({
    example: 'This store sells electronics and gadgets.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
