import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({
    example: '99887766-5544-3322-1100-aabbccddeeff',
  })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    example: 1,
    description: 'Quantity of the product added to the cart. Default is 1.',
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
