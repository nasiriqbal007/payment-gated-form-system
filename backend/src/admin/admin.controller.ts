import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { FormsService } from '../forms/forms.service';
import { ErrorMessages, SuccessMessages } from '../common/messages';

@UseGuards(JwtAuthGuard)
@Controller('admin/forms')
export class AdminController {
  constructor(private readonly formsService: FormsService) {}

  @Get()
  listForms() {
    return this.formsService.listForms();
  }

  @Get(':formId')
  async getForm(@Param('formId') formId: string) {
    const data = await this.formsService.getForm(formId);
    if (!data) {
      throw new NotFoundException(ErrorMessages.FORM_NOT_FOUND(formId));
    }
    return {
      success: true,
      message: SuccessMessages.FORM_FETCHED,
      data,
    };
  }

  @Delete(':formId')
  async deleteForm(@Param('formId') formId: string) {
    const deleted = await this.formsService.deleteForm(formId);
    if (!deleted) {
      return { success: false, message: ErrorMessages.FORM_NOT_FOUND(formId) };
    }
    return {
      success: true,
      message: SuccessMessages.FORM_DELETED(deleted.full_name || formId),
      deletedForm: deleted,
    };
  }
}
