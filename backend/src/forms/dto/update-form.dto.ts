import { IsString, IsEnum, IsOptional, IsDateString } from 'class-validator';

export class UpdateFormDto {
  @IsOptional()
  current_step?: number;

  @IsOptional()
  @IsString()
  full_name?: string;

  @IsOptional()
  @IsDateString()
  date_of_birth?: string;

  @IsOptional()
  @IsEnum(['male', 'female'])
  gender?: 'male' | 'female';

  @IsOptional()
  @IsString()
  blood_group?: string;

  @IsOptional()
  @IsString()
  parent_name?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  occupation?: string;

  @IsOptional()
  @IsString()
  grade?: string;

  @IsOptional()
  @IsString()
  previous_school?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
