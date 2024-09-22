import { IsUUID } from 'class-validator';

export class UpdateStoreParams {
  @IsUUID()
  id: string;
}
