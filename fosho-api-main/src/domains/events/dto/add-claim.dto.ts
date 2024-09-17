import { IsArray } from 'class-validator';

export class AddClaimDto {
  @IsArray()
  attendeesId: string[];
}
