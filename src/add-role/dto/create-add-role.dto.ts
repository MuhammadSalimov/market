import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export enum role {
  seller = 'seller',
  warehouse_manager = 'warehouse_manager',
}
export class CreateAddRoleDto {
  @ApiProperty({
    example: 'dfgdrthrtyhrtyhgdfbxrfaerwgfv',
  })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: 'seller',
  })
  @IsNotEmpty()
  @IsEnum(role)
  role: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

export class UserDto {
  id: string;
  name: string;
  email: string;
  role: string;

  constructor({ id, name, email, role }: UserData) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }
}
