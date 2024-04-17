'use server'

import { CheckoutTransactionParams } from '@/types'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'
import { formatAmountForStripe } from '../utils'

export async function checkoutCredits(transaction: CheckoutTransactionParams) {
  //  const transaction = {
  //    plan: plans[1].name,
  //    amount: plans[1].price,
  //    credits: plans[1].credits,
  //    buyerId: userId,
  //  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'cad',
          product_data: {
            name: 'Custom amount donation',
          },
          unit_amount: formatAmountForStripe(transaction.amount),
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
  })

  redirect(session.url!)
}
