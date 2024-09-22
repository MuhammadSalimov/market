import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({
    example: 'aabbccdd-eeff-1122-3344-556677889900',
  })
  @IsUUID()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({
    example: '99887766-5544-3322-1100-aabbccddeeff',
  })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    example: 49.99,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
