import { IsNumber, IsString, IsOptional, IsPositive } from 'class-validator';

export class CreateCheckoutSessionDto {
  @IsNumber()
  @IsPositive()
  amount!: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  successUrl?: string;

  @IsString()
  @IsOptional()
  cancelUrl?: string;
}
