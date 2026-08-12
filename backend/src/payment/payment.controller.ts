import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
import { SuccessMessages } from '../common/messages';
import Stripe from 'stripe';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('checkout-session')
  async createCheckoutSession(
    @Body() createCheckoutSessionDto: CreateCheckoutSessionDto,
  ): Promise<{
    success: boolean;
    message: string;
    data: Stripe.Checkout.Session;
  }> {
    const data = await this.paymentService.createCheckoutSession(
      createCheckoutSessionDto.amount,
      createCheckoutSessionDto.currency,
      createCheckoutSessionDto.successUrl,
      createCheckoutSessionDto.cancelUrl,
    );
    return {
      success: true,
      message: SuccessMessages.PAYMENT_SESSION_CREATED,
      data,
    };
  }

  @Get('verify')
  async verifyPayment(@Query('sessionId') sessionId: string) {
    const data = await this.paymentService.verifyPayment(sessionId);
    return {
      success: true,
      message: SuccessMessages.PAYMENT_VERIFIED,
      data,
    };
  }
}
