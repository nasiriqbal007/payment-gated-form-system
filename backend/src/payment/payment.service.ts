import { Injectable, BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';
import { ErrorMessages } from '../common/messages';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2026-07-29.dahlia',
    });
  }

  async createCheckoutSession(
    amount: number,
    currency?: string,
    successUrl?: string,
    cancelUrl?: string,
  ): Promise<Stripe.Checkout.Session> {
    const currencyNormalized = (currency ?? 'usd').toLowerCase();

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currencyNormalized,
            product_data: {
              name: 'Form Submission',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',

      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return session;
  }

  async verifyPayment(sessionId: string) {
    const payment = await this.stripe.checkout.sessions.retrieve(sessionId);

    if (payment.payment_status !== 'paid') {
      throw new BadRequestException(ErrorMessages.PAYMENT_NOT_COMPLETED);
    }

    return { paid: true, sessionId: payment.id };
  }
}
