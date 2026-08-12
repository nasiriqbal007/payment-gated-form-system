import { Module } from '@nestjs/common';
import { FormsModule } from '../forms/forms.module';
import { AdminController } from './admin.controller';

@Module({
  imports: [FormsModule],
  controllers: [AdminController],
})
export class AdminModule {}
