import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { FormsService } from './forms.service';
import { ErrorMessages, SuccessMessages } from '../common/messages';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Patch(':formId')
  async saveForm(
    @Param('formId') formId: string,
    @Body() createFormDto: CreateFormDto,
  ) {
    const data = await this.formsService.saveForm(formId, createFormDto);
    return {
      success: true,
      message: SuccessMessages.DRAFT_SAVED,
      data,
    };
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

  @Patch(':formId/submit')
  async submitForm(@Param('formId') formId: string) {
    const data = await this.formsService.submitForm(formId);
    if (!data) {
      throw new NotFoundException(ErrorMessages.FORM_NOT_FOUND(formId));
    }
    return {
      success: true,
      message: SuccessMessages.FORM_SUBMITTED,
      data,
    };
  }
}
