// app/api/test-subscription/route.js
// Create this file to test your Stripe integration

import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  try {
    console.log('🧪 Testing Stripe integration...');
    
    // Test 1: Check if Stripe is configured
    console.log('1️⃣ Testing Stripe configuration...');
    const account = await stripe.accounts.retrieve();
    console.log('✅ Stripe account ID:', account.id);

    // Test 2: List some prices
    console.log('2️⃣ Testing price retrieval...');
    const prices = await stripe.prices.list({ limit: 3, active: true });
    console.log('✅ Found prices:', prices.data.length);
    
    if (prices.data.length > 0) {
      const testPrice = prices.data[0];
      console.log('📋 Sample price:', {
        id: testPrice.id,
        currency: testPrice.currency,
        unit_amount: testPrice.unit_amount,
        recurring: testPrice.recurring
      });

      // Test 3: Try creating a test customer
      console.log('3️⃣ Testing customer creation...');
      const testCustomer = await stripe.customers.create({
        email: 'test@example.com',
        name: 'Test User',
      });
      console.log('✅ Created test customer:', testCustomer.id);

      // Test 4: Try creating a subscription (but don't complete it)
      console.log('4️⃣ Testing subscription creation...');
      const testSubscription = await stripe.subscriptions.create({
        customer: testCustomer.id,
        items: [{ price: testPrice.id }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });

      console.log('✅ Created test subscription:', testSubscription.id);
      
      const hasClientSecret = !!testSubscription.latest_invoice?.payment_intent?.client_secret;
      console.log('🔑 Client secret exists:', hasClientSecret);

      // Clean up test data
      await stripe.subscriptions.cancel(testSubscription.id);
      await stripe.customers.del(testCustomer.id);
      console.log('🧹 Cleaned up test data');

      return NextResponse.json({
        success: true,
        message: 'All tests passed!',
        tests: {
          stripeConfigured: true,
          pricesFound: prices.data.length,
          customerCreated: true,
          subscriptionCreated: true,
          clientSecretGenerated: hasClientSecret
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'No active prices found in Stripe'
      });
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      type: error.type
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { priceId, userEmail } = await request.json();
    
    console.log('🧪 Testing subscription with actual data:', { priceId, userEmail });

    if (!priceId || !userEmail) {
      return NextResponse.json({
        error: 'priceId and userEmail are required'
      }, { status: 400 });
    }

    // Validate price exists
    const price = await stripe.prices.retrieve(priceId);
    console.log('✅ Price validated:', price.id);

    // Create customer
    const customer = await stripe.customers.create({
      email: userEmail,
      name: 'Test User',
    });
    console.log('✅ Customer created:', customer.id);

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    console.log('✅ Subscription created:', subscription.id);

    const clientSecret = subscription.latest_invoice?.payment_intent?.client_secret;
    
    if (!clientSecret) {
      throw new Error('No client secret generated');
    }

    return NextResponse.json({
      success: true,
      subscriptionId: subscription.id,
      clientSecret: clientSecret,
      customerId: customer.id,
      message: 'Test subscription created successfully!'
    });

  } catch (error) {
    console.error('❌ Test POST failed:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      type: error.type
    }, { status: 500 });
  }
}