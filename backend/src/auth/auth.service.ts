import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { pool } from '../database/db';
import { ErrorMessages, SuccessMessages } from '../common/messages';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(dto: LoginDto) {
    const result = await pool.query(
      'SELECT id, name, email, password_hash FROM admin WHERE email = $1',
      [dto.email],
    );

    const admin = result.rows[0];

    if (!admin) {
      throw new UnauthorizedException(ErrorMessages.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      admin.password_hash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(ErrorMessages.INVALID_CREDENTIALS);
    }

    const payload = {
      sub: admin.id,
      email: admin.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      message: SuccessMessages.LOGIN_SUCCESS,
      access_token: token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    };
  }
}
