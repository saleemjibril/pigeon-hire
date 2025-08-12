// app/api/debug-price/route.js
import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { priceId, userEmail = "test@example.com" } = await request.json();
    
    console.log('🔍 Debugging price ID:', priceId);

    // Step 1: Get price details
    const price = await stripe.prices.retrieve(priceId);
    console.log('📋 Price details:', {
      id: price.id,
      object: price.object,
      active: price.active,
      currency: price.currency,
      type: price.type,
      unit_amount: price.unit_amount,
      recurring: price.recurring,
      billing_scheme: price.billing_scheme,
      created: price.created,
      livemode: price.livemode,
      product: price.product
    });

    // Step 2: Create test customer
    const customer = await stripe.customers.create({
      email: userEmail,
      name: 'Debug Test User',
    });
    console.log('✅ Created test customer:', customer.id);

    // Step 3: Try creating subscription with different approaches
    console.log('🧪 Testing subscription creation approaches...');

    // Approach 1: Standard incomplete subscription
    try {
      console.log('📝 Approach 1: Standard incomplete subscription');
      const sub1 = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });

      const clientSecret1 = sub1.latest_invoice?.payment_intent?.client_secret;
      console.log('✅ Approach 1 result:', {
        subscription_id: sub1.id,
        status: sub1.status,
        has_client_secret: !!clientSecret1,
        client_secret: clientSecret1,
        latest_invoice_status: sub1.latest_invoice?.status,
        payment_intent_status: sub1.latest_invoice?.payment_intent?.status
      });

      // Clean up
      await stripe.subscriptions.cancel(sub1.id);
    } catch (err) {
      console.error('❌ Approach 1 failed:', err.message);
    }

    // Approach 2: Allow incomplete with immediate collection
    try {
      console.log('📝 Approach 2: Allow incomplete with collection');
      const sub2 = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: priceId }],
        payment_behavior: 'allow_incomplete',
        collection_method: 'charge_automatically',
        expand: ['latest_invoice.payment_intent'],
      });

      const clientSecret2 = sub2.latest_invoice?.payment_intent?.client_secret;
      console.log('✅ Approach 2 result:', {
        subscription_id: sub2.id,
        status: sub2.status,
        has_client_secret: !!clientSecret2,
        client_secret: clientSecret2,
      });

      // Clean up
      await stripe.subscriptions.cancel(sub2.id);
    } catch (err) {
      console.error('❌ Approach 2 failed:', err.message);
    }

    // Approach 3: Create separate payment intent
    try {
      console.log('📝 Approach 3: Separate payment intent');
      const paymentIntent = await stripe.paymentIntents.create({
        amount: price.unit_amount,
        currency: price.currency,
        customer: customer.id,
        setup_future_usage: 'off_session',
        metadata: {
          price_id: priceId,
          test: 'debug'
        }
      });

      console.log('✅ Approach 3 result:', {
        payment_intent_id: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        has_client_secret: !!paymentIntent.client_secret,
        client_secret: paymentIntent.client_secret
      });

      // Don't cancel this one, just let it expire
    } catch (err) {
      console.error('❌ Approach 3 failed:', err.message);
    }

    // Clean up customer
    await stripe.customers.del(customer.id);

    return NextResponse.json({
      success: true,
      message: 'Debug completed - check server logs for details',
      price_details: {
        id: price.id,
        currency: price.currency,
        amount: price.unit_amount,
        type: price.type,
        recurring: price.recurring
      }
    });

  } catch (error) {
    console.error('❌ Debug failed:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      type: error.type
    }, { status: 500 });
  }
}

// GET method to test a known problematic price
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const priceId = searchParams.get('priceId') || 'price_1RtHisAHGAMUCpPmnxTQsW5j'; // Your NGN quarterly price
  
  return POST(new Request(request.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId })
  }));
}