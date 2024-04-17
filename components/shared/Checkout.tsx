'use client'

import { loadStripe } from '@stripe/stripe-js'
import { useEffect } from 'react'

import { useToast } from '@/components/ui/use-toast'
import { checkoutCredits } from '@/lib/actions/transaction.action'

import { Button } from '../ui/button'
import getStripe from '@/lib/utils'
import { plans } from '@/constants'
import { auth } from '@clerk/nextjs'

const Checkout = ({
  plan,
  amount,
  credits,
  userId,
}: {
  plan?: string
  amount?: number
  credits?: number
  userId: string
}) => {
  const { toast } = useToast()

  useEffect(() => {
    ;(async () => {
      await getStripe()
    })()
  }, [])

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)
    if (query.get('success')) {
      toast({
        title: 'Order placed!',
        description: 'You will receive an email confirmation',
        duration: 5000,
        className: 'success-toast',
      })
    }

    if (query.get('canceled')) {
      toast({
        title: 'Order canceled!',
        description: "Continue to shop around and checkout when you're ready",
        duration: 5000,
        className: 'error-toast',
      })
    }
  }, [])

  const onCheckout = async () => {
    const transaction = {
      plan: plans[1].name,
      amount: plans[1].price,
      credits: plans[1].credits,
      buyerId: userId,
    }

    await checkoutCredits(transaction)
  }

  return (
    <form action={onCheckout} method="POST">
      <section>
        <Button
          type="submit"
          role="link"
          className="bg-purple-gradient w-full rounded-full bg-black bg-cover text-blue-200"
        >
          Buy Credit
        </Button>
      </section>
    </form>
  )
}

export default Checkout
