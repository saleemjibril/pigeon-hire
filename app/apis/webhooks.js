// import { NextResponse } from "next/server";
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// // Function to get proper currency UUIDs matching your frontend expectations
// function getCurrencyId(currency) {
//   const currencyMap = {
//     'USD': 'b54d6896-59f9-4121-881f-bf15d694e387',
//     'EUR': '01b2f00a-bf05-4824-a01c-242e1dcbe8f7',
//     'GBP': 'b942054e-0831-424f-8bc8-d2f7930227e5',
//     'CAD': 'c769556c-dc66-4284-8f93-c1fdc8185f5d',
//     'AUD': 'd79b2c69-2643-4b86-8068-aa76511f064d',
//     'NGN': '28ec7518-3c23-4289-9319-c37e641e88b1',
//     'INR': '2ecf46f6-18ec-496d-beca-843597ff84b8',
//     'ZMW': '28d8d52a-fa8f-4002-b105-34796611042b',
//   };
  
//   return currencyMap[currency] || `unknown-${currency.toLowerCase()}`;
// }

// // FIXED: Function to organize prices by currency and interval
// export const organizePricesByCurrency = (prices) => {
//   const organizedPlans = {};

//   console.log('🔍 Processing prices:', prices.length);

//   prices.forEach((price, index) => {
//     console.log(`📋 Processing price ${index}:`, {
//       id: price.id,
//       currency: price.currency,
//       recurring: price.recurring,
//       unit_amount: price.unit_amount
//     });

//     const currency = price.currency.toUpperCase();
    
//     if (!organizedPlans[currency]) {
//       organizedPlans[currency] = {
//         currency: currency,
//         currencyId: getCurrencyId(currency),
//         plans: {},
//       };
//     }

//     // Skip non-recurring prices (one-time payments)
//     if (!price.recurring) {
//       console.log(`⚠️ Skipping non-recurring price: ${price.id}`);
//       return;
//     }

//     // Determine plan type based on interval
//     let planType;
//     if (price.recurring.interval === 'month' && price.recurring.interval_count === 1) {
//       planType = 'monthly';
//     } else if (price.recurring.interval === 'year' && price.recurring.interval_count === 1) {
//       planType = 'annually';
//     } else if (price.recurring.interval === 'month' && price.recurring.interval_count === 3) {
//       planType = 'quarterly';
//     } else {
//       console.log(`⚠️ Skipping unsupported interval: ${price.recurring.interval}/${price.recurring.interval_count}`);
//       return;
//     }

//     // CRITICAL FIX: Use consistent field access
//     organizedPlans[currency].plans[planType] = {
//       priceId: price.id, // ✅ This is the key fix
//       amount: price.unit_amount / 100, // Convert from cents to dollars
//       currency: price.currency,
//       interval: price.recurring.interval,
//       intervalCount: price.recurring.interval_count,
//       nickname: price.nickname,
//       productId: price.product,
//     };

//     console.log(`✅ Added ${planType} plan for ${currency}:`, {
//       priceId: price.id,
//       amount: price.unit_amount / 100
//     });
//   });

//   const result = Object.values(organizedPlans);
//   console.log('📦 Final organized plans:', result);
  
//   return result;
// };

// // GET route for fetching subscription plans
// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const userCurrency = searchParams.get('userCurrency');

//     console.log('🔍 Fetching prices from Stripe...');
    
//     // Fetch active prices from Stripe using the official SDK
//     const prices = await stripe.prices.list({
//       active: true,
//       limit: 100,
//       expand: ['data.product'],
//     });

//     console.log('✅ Raw Stripe response:', {
//       count: prices.data.length,
//       sample: prices.data[0] ? {
//         id: prices.data[0].id,
//         currency: prices.data[0].currency,
//         recurring: prices.data[0].recurring,
//         unit_amount: prices.data[0].unit_amount
//       } : 'No prices found'
//     });

//     if (!prices.data || prices.data.length === 0) {
//       return NextResponse.json({
//         msg: 'No active prices found',
//         plans: [],
//         total: 0,
//       });
//     }

//     let organizedPlans = organizePricesByCurrency(prices.data);

//     // Filter by currency if specified
//     if (userCurrency) {
//       organizedPlans = organizedPlans.filter(
//         plan => plan.currency === userCurrency.toUpperCase()
//       );
//       console.log(`🎯 Filtered to ${userCurrency}: ${organizedPlans.length} plans`);
//     }

//     // Debug logging for price IDs
//     organizedPlans.forEach(plan => {
//       console.log(`💰 ${plan.currency}: ${Object.keys(plan.plans).length} plan types`);
//       Object.entries(plan.plans).forEach(([planType, planDetails]) => {
//         console.log(`  - ${planType}: priceId="${planDetails.priceId}" amount=${planDetails.amount}`);
        
//         // CRITICAL: Validate price ID exists
//         if (!planDetails.priceId) {
//           console.error(`🚨 MISSING PRICE ID for ${plan.currency} ${planType}!`);
//         }
//       });
//     });

//     return NextResponse.json({
//       msg: 'Subscription plans retrieved successfully',
//       plans: organizedPlans,
//       total: organizedPlans.length,
//       debug: {
//         rawPricesCount: prices.data.length,
//         organizedPlansCount: organizedPlans.length,
//         userCurrency: userCurrency || 'all'
//       }
//     });

//   } catch (error) {
//     console.error('❌ Plans API error:', error);
//     return NextResponse.json({
//       msg: 'Internal server error',
//       error: error.message,
//       plans: [],
//     }, { status: 500 });
//   }
// }

// // POST function for creating subscriptions
// export async function POST(request) {
//   try {
//     const { 
//       priceId, 
//       userId, 
//       userEmail, 
//       userName,
//       planType,
//       currency 
//     } = await request.json();

//     // Validate required fields
//     if (!priceId || !userEmail) {
//       return NextResponse.json(
//         { error: "Missing required fields: priceId and userEmail are required" },
//         { status: 400 }
//       );
//     }

//     console.log("Creating subscription with:", { 
//       priceId, 
//       userEmail, 
//       userId,
//       planType,
//       currency 
//     });

//     // Validate that the price ID exists in Stripe
//     try {
//       const priceCheck = await stripe.prices.retrieve(priceId);
//       console.log("✅ Price validation successful:", priceCheck.id);
//     } catch (priceError) {
//       console.error("❌ Invalid price ID:", priceId);
//       return NextResponse.json(
//         { error: `Invalid price ID: ${priceId}` },
//         { status: 400 }
//       );
//     }

//     // Check if customer already exists
//     let customer;
//     const existingCustomers = await stripe.customers.list({
//       email: userEmail,
//       limit: 1,
//     });

//     if (existingCustomers.data.length > 0) {
//       customer = existingCustomers.data[0];
//       console.log("Found existing customer:", customer.id);
//     } else {
//       // Create new customer
//       customer = await stripe.customers.create({
//         email: userEmail,
//         name: userName || '',
//         metadata: {
//           userId: userId || '',
//           planType: planType || '',
//         },
//       });
//       console.log("Created new customer:", customer.id);
//     }

//     // Create the subscription
//     const subscription = await stripe.subscriptions.create({
//       customer: customer.id,
//       items: [
//         {
//           price: priceId,
//         },
//       ],
//       payment_behavior: 'default_incomplete',
//       payment_settings: { save_default_payment_method: 'on_subscription' },
//       expand: ['latest_invoice.payment_intent'],
//       metadata: {
//         userId: userId || '',
//         planType: planType || '',
//         currency: currency || 'usd',
//       },
//     });

//     console.log("✅ Created subscription:", subscription.id);

//     return NextResponse.json({
//       subscriptionId: subscription.id,
//       clientSecret: subscription.latest_invoice.payment_intent.client_secret,
//       customerId: customer.id,
//     });

//   } catch (error) {
//     console.error("❌ Stripe subscription error:", error);
    
//     // Handle specific Stripe errors
//     if (error.type === 'StripeCardError') {
//       return NextResponse.json(
//         { error: error.message },
//         { status: 400 }
//       );
//     }
    
//     if (error.type === 'StripeInvalidRequestError') {
//       return NextResponse.json(
//         { error: `Invalid request: ${error.message}` },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       { error: `Internal Server Error: ${error.message}` },
//       { status: 500 }
//     );
//   }
// }