import {
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  IsEmail,
} from 'class-validator';

export class CreateFormDto {
  @IsOptional()
  current_step?: number;

  @IsString()
  full_name!: string;

  @IsDateString()
  date_of_birth!: string;

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
  @IsEmail()
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
