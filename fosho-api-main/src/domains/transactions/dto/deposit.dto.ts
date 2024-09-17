import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mintAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}

export class DepositDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  payer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(['blockhash', 'durable_nonce'])
  strategy: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => TokenDto)
  token: TokenDto;
}
