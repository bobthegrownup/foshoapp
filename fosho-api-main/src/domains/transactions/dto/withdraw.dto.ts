import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WithdrawDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  payer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(['blockhash', 'durable_nonce'])
  strategy: string;
}
