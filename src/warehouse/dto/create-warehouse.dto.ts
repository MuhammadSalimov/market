import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateWarehouseDto {
  @ApiProperty({ example: 'sdfsrgsdrgfsdfgsdfgsf' })
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
