import { Transform } from 'class-transformer';
import { IsNumber, IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  location: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  content: string;

  @IsString()
  @IsNotEmpty()
  walletAddress: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  eventTimestamp: Date;
}
