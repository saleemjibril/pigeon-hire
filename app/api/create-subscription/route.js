// app/api/create-subscription/route.js
import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    console.log('🚀 Create subscription API called');
    
    const body = await request.json();
    console.log('📦 Request body:', body);
    
    const { 
      priceId, 
      userId, 
      userEmail, 
      userName,
      planType,
      currency,
      amount
    } = body;

    // Validate required fields
    if (!priceId) {
      console.error('❌ Missing priceId');
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    if (!userEmail) {
      console.error('❌ Missing userEmail');
      return NextResponse.json(
        { error: "User email is required" },
        { status: 400 }
      );
    }

    console.log("✅ Creating subscription with:", { 
      priceId, 
      userEmail, 
      userId,
      planType,
      currency 
    });

    // Validate and get price details
    let priceDetails;
    try {
      priceDetails = await stripe.prices.retrieve(priceId);
      console.log("✅ Price validation successful:", {
        id: priceDetails.id,
        currency: priceDetails.currency,
        unit_amount: priceDetails.unit_amount,
        recurring: priceDetails.recurring,
        type: priceDetails.type
      });
    } catch (priceError) {
      console.error("❌ Invalid price ID:", priceId, priceError);
      return NextResponse.json(
        { error: `Invalid price ID: ${priceId}` },
        { status: 400 }
      );
    }

    // Check if customer already exists
    let customer;
    console.log('🔍 Checking for existing customer...');
    
    const existingCustomers = await stripe.customers.list({
      email: userEmail,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
      console.log("👤 Found existing customer:", customer.id);
    } else {
      // Create new customer
      console.log('👤 Creating new customer...');
      customer = await stripe.customers.create({
        email: userEmail,
        name: userName || '',
        metadata: {
          userId: userId || '',
          planType: planType || '',
        },
      });
      console.log("✅ Created new customer:", customer.id);
    }

    // Create subscription with proper payment handling
    console.log('📝 Creating subscription...');
    
    const subscriptionParams = {
      customer: customer.id,
      items: [
        {
          price: priceId,
        },
      ],
      metadata: {
        userId: userId || '',
        planType: planType || '',
        currency: currency || priceDetails.currency,
      },
      // Always expand to get payment intent details
      expand: ['latest_invoice.payment_intent', 'pending_setup_intent'],
    };

    // For recurring subscriptions, we need to handle payment collection
    if (priceDetails.type === 'recurring') {
      subscriptionParams.payment_behavior = 'default_incomplete';
      subscriptionParams.payment_settings = { 
        save_default_payment_method: 'on_subscription',
        payment_method_types: ['card'] // Ensure card payments
      };
      subscriptionParams.collection_method = 'charge_automatically';
    }

    const subscription = await stripe.subscriptions.create(subscriptionParams);

    console.log("✅ Created subscription:", subscription.id);
    console.log("🔍 Subscription details:");
    console.log("- status:", subscription.status);
    console.log("- collection_method:", subscription.collection_method);
    console.log("- latest_invoice exists:", !!subscription.latest_invoice);
    
    let clientSecret = null;
    let paymentIntentId = null;

    if (subscription.latest_invoice) {
      console.log("📄 Latest invoice:", subscription.latest_invoice.id);
      console.log("- invoice status:", subscription.latest_invoice.status);
      console.log("- payment_intent exists:", !!subscription.latest_invoice.payment_intent);
      
      if (subscription.latest_invoice.payment_intent) {
        const paymentIntent = subscription.latest_invoice.payment_intent;
        console.log("💳 Payment Intent:");
        console.log("- id:", paymentIntent.id);
        console.log("- status:", paymentIntent.status);
        console.log("- client_secret exists:", !!paymentIntent.client_secret);
        console.log("- amount:", paymentIntent.amount);
        console.log("- currency:", paymentIntent.currency);
        
        clientSecret = paymentIntent.client_secret;
        paymentIntentId = paymentIntent.id;
      }
    }

    // If no client secret from invoice, check for setup intent
    if (!clientSecret && subscription.pending_setup_intent) {
      console.log("🔧 Using setup intent instead:");
      console.log("- setup_intent id:", subscription.pending_setup_intent.id);
      console.log("- setup_intent client_secret:", subscription.pending_setup_intent.client_secret);
      clientSecret = subscription.pending_setup_intent.client_secret;
    }

    // If still no client secret, create a manual payment intent
    if (!clientSecret) {
      console.log("⚠️ No client secret from subscription, creating manual payment intent...");
      
      try {
        const manualPaymentIntent = await stripe.paymentIntents.create({
          amount: priceDetails.unit_amount,
          currency: priceDetails.currency,
          customer: customer.id,
          setup_future_usage: 'off_session', // For future payments
          metadata: {
            subscription_id: subscription.id,
            userId: userId || '',
            planType: planType || '',
          },
        });

        clientSecret = manualPaymentIntent.client_secret;
        paymentIntentId = manualPaymentIntent.id;
        
        console.log("✅ Created manual payment intent:", manualPaymentIntent.id);
        console.log("- client_secret:", clientSecret);
      } catch (paymentIntentError) {
        console.error("❌ Failed to create manual payment intent:", paymentIntentError);
        throw new Error("Failed to create payment intent for subscription");
      }
    }

    if (!clientSecret) {
      console.error("❌ Still no client secret after all attempts");
      console.error("❌ Subscription object:", JSON.stringify(subscription, null, 2));
      
      // Cancel the subscription since we can't process payment
      await stripe.subscriptions.cancel(subscription.id);
      throw new Error("Failed to get client secret from Stripe - subscription cancelled");
    }

    const responseData = {
      subscriptionId: subscription.id,
      clientSecret: clientSecret,
      customerId: customer.id,
      paymentIntentId: paymentIntentId,
      subscriptionStatus: subscription.status,
    };

    console.log("✅ Sending successful response:", responseData);

    return NextResponse.json(responseData);

  } catch (error) {
    console.error("❌ Stripe subscription error:", error);
    console.error("❌ Error type:", error.type);
    console.error("❌ Error stack:", error.stack);
    
    // Handle specific Stripe errors
    if (error.type === 'StripeCardError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    if (error.type === 'StripeInvalidRequestError') {
      return NextResponse.json(
        { error: `Invalid request: ${error.message}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}