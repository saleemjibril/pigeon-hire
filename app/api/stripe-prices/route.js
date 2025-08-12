// app/api/stripe-prices/route.js
import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  try {
    console.log('🔍 Fetching Stripe prices...');
    
    // Fetch all active prices from Stripe
    const prices = await stripe.prices.list({
      active: true,
      limit: 100,
      expand: ['data.product'],
    });

    console.log('✅ Retrieved prices:', prices.data.length);

    return NextResponse.json({
      success: true,
      prices: prices.data,
      count: prices.data.length
    });

  } catch (error) {
    console.error('❌ Stripe prices API error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      prices: []
    }, { status: 500 });
  }
}