export class FormResponseDto {
  id!: string;
  status!: 'draft' | 'submitted';
  current_step!: number;
  full_name?: string;
  date_of_birth?: string;
  gender?: 'male' | 'female';
  blood_group?: string;
  parent_name?: string;
  phone_number?: string;
  email?: string;
  occupation?: string;
  grade?: string;
  previous_school?: string;
  address?: string;
  created_at?: Date;
  updated_at?: Date;
  submitted_at?: Date | null;
}
