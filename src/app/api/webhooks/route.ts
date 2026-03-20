import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '../../../stripe/config'
import { getAdminDb } from '@/firebase/admin'

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  try {
    const adminDb = getAdminDb()

    // Raw body handling (correct for App Router)
    const rawBody = await req.text()
    const buf = Buffer.from(rawBody)

    const event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    switch (event.type) {
      case 'checkout.session.completed':
        console.log('Checkout session completed')
        break

      case 'customer.subscription.created': {
        const subscription: any = event.data.object
        const userId = subscription.metadata?.userId

        if (userId) {
          await adminDb.collection('users').doc(userId).set(
            {
              role: subscription.metadata?.role,
              stripeId: subscription.customer,
              subscriptionId: subscription.id,
              subscriptionStatus: subscription.status,
              subscriptionExpires: subscription.current_period_end,
            },
            { merge: true }
          )
        }
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription: any = event.data.object
        const userId = subscription.metadata?.userId

        if (userId) {
          await adminDb.collection('users').doc(userId).set(
            {
              subscriptionStatus: subscription.status,
              subscriptionExpires: subscription.current_period_end,
            },
            { merge: true }
          )
        }
        break
      }

      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error(
      `Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`
    )

    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Webhook error' },
      { status: 400 }
    )
  }
}
