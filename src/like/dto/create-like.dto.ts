import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateLikeDto {
  @ApiProperty({
    example: '99887766-5544-3322-1100-aabbccddeeff',
  })
  @IsUUID()
  @IsNotEmpty()
  productId: string;
}
