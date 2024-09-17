import { IsNotEmpty, IsString } from 'class-validator';

export class ClaimDto {
  @IsString()
  @IsNotEmpty()
  transactionId: string;

  @IsString()
  @IsNotEmpty()
  serializedTransaction: string;

  @IsString()
  @IsNotEmpty()
  walletAddress: string;
}
