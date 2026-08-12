import { Injectable } from '@nestjs/common';
import { pool } from '../database/db';
import { CreateFormDto } from './dto/create-form.dto';
import { FormResponseDto } from './dto/form-response.dto';

@Injectable()
export class FormsService {
  private buildStepPayload(createFormDto: CreateFormDto) {
    const step = createFormDto.current_step ?? 0;

    const payload: Record<string, unknown> = {
      current_step: step,
      full_name: createFormDto.full_name,
      date_of_birth: createFormDto.date_of_birth,
      gender: createFormDto.gender,
      blood_group: createFormDto.blood_group,
      parent_name: createFormDto.parent_name,
      phone_number: createFormDto.phone_number,
      email: createFormDto.email,
      occupation: createFormDto.occupation,
      grade: createFormDto.grade,
      previous_school: createFormDto.previous_school,
      address: createFormDto.address,
    };

    if (step < 1) {
      delete payload.parent_name;
      delete payload.phone_number;
      delete payload.email;
      delete payload.occupation;
    }

    if (step < 2) {
      delete payload.grade;
      delete payload.previous_school;
      delete payload.address;
    }

    return payload;
  }

  async saveForm(
    formId: string,
    createFormDto: CreateFormDto,
  ): Promise<FormResponseDto> {
    const validFormId =
      formId && formId !== 'undefined' ? formId : crypto.randomUUID();
    const payload = this.buildStepPayload(createFormDto);
    const values = [
      validFormId,
      'draft',
      payload.current_step ?? 1,
      payload.full_name ?? null,
      payload.date_of_birth ?? null,
      payload.gender ?? null,
      payload.blood_group ?? null,
      payload.parent_name ?? null,
      payload.phone_number ?? null,
      payload.email ?? null,
      payload.occupation ?? null,
      payload.grade ?? null,
      payload.previous_school ?? null,
      payload.address ?? null,
    ];

    const sql = `
      INSERT INTO forms (
        id, status, current_step, full_name, date_of_birth, gender,
        blood_group, parent_name, phone_number, email, occupation,
        grade, previous_school, address, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW()
      )
      ON CONFLICT (id) DO UPDATE SET
        status = $2,
        current_step = $3,
        full_name = COALESCE($4, forms.full_name),
        date_of_birth = COALESCE($5, forms.date_of_birth),
        gender = COALESCE($6, forms.gender),
        blood_group = COALESCE($7, forms.blood_group),
        parent_name = COALESCE($8, forms.parent_name),
        phone_number = COALESCE($9, forms.phone_number),
        email = COALESCE($10, forms.email),
        occupation = COALESCE($11, forms.occupation),
        grade = COALESCE($12, forms.grade),
        previous_school = COALESCE($13, forms.previous_school),
        address = COALESCE($14, forms.address),
        updated_at = NOW()
      RETURNING *;
    `;

    const result = await pool.query(sql, values);
    return result.rows[0] as FormResponseDto;
  }

  async getForm(formId: string): Promise<FormResponseDto | null> {
    const sql = 'SELECT * FROM forms WHERE id = $1;';
    const result = await pool.query(sql, [formId]);
    return (result.rows[0] as FormResponseDto) ?? null;
  }

  async submitForm(formId: string): Promise<FormResponseDto | null> {
    const sql = `
      UPDATE forms
      SET status = 'submitted', submitted_at = NOW()
      WHERE id = $1
      RETURNING *;
    `;
    const result = await pool.query(sql, [formId]);
    return (result.rows[0] as FormResponseDto) ?? null;
  }

  async listForms(): Promise<FormResponseDto[]> {
    const sql = 'SELECT * FROM forms ORDER BY created_at DESC;';
    const result = await pool.query(sql);
    return result.rows as FormResponseDto[];
  }

  async deleteForm(formId: string): Promise<FormResponseDto | null> {
    const sql = 'DELETE FROM forms WHERE id = $1 RETURNING *;';
    const result = await pool.query(sql, [formId]);
    return (result.rows[0] as FormResponseDto) ?? null;
  }
}
