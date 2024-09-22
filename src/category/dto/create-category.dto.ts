import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Sport',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'sfrger5tygdfgbd', required: false })
  @IsOptional()
  @IsString()
  parentCategoryId: string;
}
