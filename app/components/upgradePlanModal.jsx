import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UpgradeModalPay from "./upgradePlanModalPay";

export default function UpgradeModal({ open, setOpen }) {
  const [payOpen, setPayOpen] = useState(false);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [loading, setLoading] = useState(false);
  const [allPlans, setAllPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Get user info from Redux store
  const userInfo = useSelector(state => state.auth.userInfo);
  const dispatch = useDispatch();
  const userId = userInfo?.id || userInfo?.userId || userInfo?.user_id;

  // Cookie utility function
  const getCookie = (name) => {
    if (typeof window === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2)
      return decodeURIComponent(parts.pop().split(";").shift());
    return null;
  };

  // Set cookie utility function
  const setCookie = (name, value, days = 30) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
  };

  // Success and error handlers for payment
  const handlePaymentSuccess = (paymentData) => {
    console.log("🎉 Payment successful in UpgradeModal:", paymentData);
    
    // Check if we got a new auth token
    if (paymentData.hasNewToken) {
      console.log("✅ New auth token was set - user subscription status updated");
      
      // Optionally update Redux store with new subscription info
      // You might want to dispatch an action to update the user's subscription status
      // dispatch(updateUserSubscription({
      //   subscriptionId: paymentData.subscriptionId,
      //   planType: selectedPlan?.planType,
      //   subscriptionStatus: 'active'
      // }));
      
      // Show success message
      alert(`🎉 Subscription successful! 
      
Subscription ID: ${paymentData.subscriptionId}
Plan: ${selectedPlan?.name}
Amount: ${selectedPlan?.currencySymbol}${selectedPlan?.amount}

Your account has been upgraded and you now have access to premium features!`);
      
    } else {
      // Fallback success message
      alert(`✅ Payment successful! 
      
Subscription ID: ${paymentData.subscriptionId}

Please refresh the page to see your updated subscription status.`);
    }
    
    // Close modals
    setPayOpen(false);
    setOpen(false);
    
    // Optional: Refresh the page to reflect new subscription status
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2000);
  };

  const handlePaymentError = (errorMessage) => {
    console.error("❌ Payment error in UpgradeModal:", errorMessage);
    alert(`❌ Payment failed: ${errorMessage}`);
  };

  // Currency options for the dropdown
  const currencyOptions = [
    { code: 'USD', name: 'United States Dollar ($)', symbol: '$' },
    { code: 'EUR', name: 'Euro (€)', symbol: '€' },
    { code: 'GBP', name: 'British Pound (£)', symbol: '£' },
    { code: 'CAD', name: 'Canadian Dollar (C$)', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar (A$)', symbol: 'A$' },
    { code: 'NGN', name: 'Nigerian Naira (₦)', symbol: '₦' },
    { code: 'INR', name: 'Indian Rupee (₹)', symbol: '₹' },
    { code: 'ZMW', name: 'Zambian Kwacha (ZK)', symbol: 'ZK' }
  ];

  // Function to fetch Stripe prices
  const fetchStripePrices = async () => {
    try {
      const response = await fetch('/api/stripe-prices');
      const data = await response.json();
      
      if (data.success) {
        console.log('💳 Stripe prices fetched:', data.count);
        return data.prices || [];
      } else {
        console.error('❌ Failed to fetch Stripe prices:', data.error);
        return [];
      }
    } catch (error) {
      console.error('💥 Error fetching Stripe prices:', error);
      return [];
    }
  };

  // Function to create price ID mapping
  const createPriceIdMapping = (stripePrices) => {
    const mapping = {};
    
    stripePrices.forEach(price => {
      // Skip non-recurring prices
      if (!price.recurring) return;
      
      const currency = price.currency.toUpperCase();
      const amount = price.unit_amount / 100; // Convert cents to dollars
      
      // Determine plan type based on interval
      let planType;
      if (price.recurring.interval === 'month' && price.recurring.interval_count === 1) {
        planType = 'monthly';
      } else if (price.recurring.interval === 'year' && price.recurring.interval_count === 1) {
        planType = 'annually';
      } else if (price.recurring.interval === 'month' && price.recurring.interval_count === 3) {
        planType = 'quarterly';
      } else {
        return; // Skip unsupported intervals
      }
      
      // Create a unique key for mapping
      const key = `${currency}-${planType}-${amount}`;
      mapping[key] = price.id;
      
      console.log(`🗺️ Mapping created: ${key} -> ${price.id}`);
    });
    
    console.log('📋 Complete price mapping:', mapping);
    return mapping;
  };

  // Function to map price IDs to plans
  const mapPriceIdsToPlans = (plans, priceIdMapping) => {
    return plans.map(currencyPlan => {
      const updatedPlans = {};
      
      Object.entries(currencyPlan.plans).forEach(([planType, planDetails]) => {
        // Create the same key format used in mapping
        const key = `${currencyPlan.currency}-${planType}-${planDetails.amount}`;
        const priceId = priceIdMapping[key];
        
        updatedPlans[planType] = {
          ...planDetails,
          priceId: priceId || null // Map the actual price ID
        };
        
        console.log(`🔗 Mapping ${key}: ${priceId || 'NOT FOUND'}`);
        
        if (!priceId) {
          console.warn(`⚠️ No price ID found for ${key}`);
          console.warn(`Available keys:`, Object.keys(priceIdMapping).filter(k => k.startsWith(currencyPlan.currency)));
        }
      });
      
      return {
        ...currencyPlan,
        plans: updatedPlans
      };
    });
  };

  // Fetch all subscription plans on component mount
  useEffect(() => {
    const fetchAllPlans = async () => {
      try {
        setLoading(true);
        console.log('🔍 Fetching plans and prices...');
        
        // Fetch both your backend plans and Stripe prices in parallel
        const [plansResponse, stripePrices] = await Promise.all([
          fetch('https://pigeonhireserver-production.up.railway.app/api/subscriptions/plans'),
          fetchStripePrices()
        ]);
        
        const plansData = await plansResponse.json();
        
        console.log('📦 Backend plans response:', plansData);
        console.log('💳 Stripe prices count:', stripePrices.length);
        
        if (plansData.msg === "Subscription plans retrieved successfully") {
          // Create price ID mapping from Stripe prices
          const priceIdMapping = createPriceIdMapping(stripePrices);
          
          // Map price IDs to your backend plans
          const plansWithPriceIds = mapPriceIdsToPlans(plansData.plans, priceIdMapping);
          
          console.log('✅ Final plans with price IDs:', plansWithPriceIds);
          
          // Validate that we have price IDs
          let missingPriceIds = 0;
          let totalPlans = 0;
          
          plansWithPriceIds.forEach(currencyPlan => {
            Object.values(currencyPlan.plans).forEach(plan => {
              totalPlans++;
              if (!plan.priceId) missingPriceIds++;
            });
          });
          
          console.log(`📊 Price ID Status: ${totalPlans - missingPriceIds}/${totalPlans} plans have price IDs`);
          
          if (missingPriceIds > 0) {
            console.warn(`⚠️ ${missingPriceIds} plans are missing price IDs!`);
          }
          
          setAllPlans(plansWithPriceIds);
          
          // Set initial plans for USD
          const usdPlans = plansWithPriceIds.filter(plan => plan.currency === 'USD');
          console.log('💰 USD Plans with price IDs:', usdPlans);
          setSubscriptionPlans(usdPlans);
        } else {
          console.error('❌ Backend API returned unexpected message:', plansData.msg);
        }
      } catch (error) {
        console.error('💥 Error fetching subscription plans:', error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchAllPlans();
    }
  }, [open]);

  // Handle currency change
  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setSelectedCurrency(newCurrency);
    
    console.log(`🔄 Changing currency to: ${newCurrency}`);
    
    // Filter from already loaded plans with price IDs
    const currencyPlans = allPlans.filter(plan => plan.currency === newCurrency);
    console.log(`💱 Filtered ${newCurrency} plans:`, currencyPlans);
    setSubscriptionPlans(currencyPlans);
  };

  // Get currency symbol
  const getCurrencySymbol = (currencyCode) => {
    const currency = currencyOptions.find(option => option.code === currencyCode);
    return currency ? currency.symbol : currencyCode;
  };

  // Format plan name based on interval
  const getPlanName = (planType) => {
    switch (planType) {
      case 'monthly':
        return 'Essential plan';
      case 'annually':
        return 'Premier plan';
      case 'quarterly':
        return 'Pro plan';
      default:
        return 'Plan';
    }
  };

  // Format subscription period
  const getSubscriptionPeriod = (planType, intervalCount) => {
    switch (planType) {
      case 'monthly':
        return 'Monthly subscription';
      case 'annually':
        return 'Yearly subscription';
      case 'quarterly':
        return `${intervalCount}-months subscription`;
      default:
        return 'Subscription';
    }
  };

  const handleClose = (e) => {
    if (e.target.classList.contains("upgrade-plan-modal")) {
      setOpen(false);
    }
  };

  const handlePlanClick = (currencyPlan, planType) => {
    console.log('🎯 Plan clicked!');
    console.log('📋 Currency Plan:', currencyPlan);
    console.log('📝 Plan Type:', planType);
    
    const planDetails = currencyPlan.plans[planType];
    console.log('🔍 Plan Details:', planDetails);
    console.log('💳 Price ID from plan details:', planDetails.priceId);
    
    // Validate price ID before proceeding
    if (!planDetails.priceId) {
      console.error('🚨 CRITICAL: Price ID is missing!');
      alert('Error: Price ID is missing for this plan. Please try again or contact support.');
      return;
    }
    
    const selectedPlanData = {
      name: getPlanName(planType),
      period: getSubscriptionPeriod(planType, planDetails.intervalCount),
      amount: planDetails.amount,
      currency: currencyPlan.currency,
      currencySymbol: getCurrencySymbol(currencyPlan.currency),
      interval: planDetails.interval,
      intervalCount: planDetails.intervalCount,
      currencyId: currencyPlan.currencyId,
      priceId: planDetails.priceId,
      planType: planType, // Add this for Redux updates
      userEmail: userInfo?.email,
      userName: userInfo?.name || `${userInfo?.firstName || ''} ${userInfo?.lastName || ''}`.trim(),
    };
    
    console.log('🎪 Final Selected Plan Data:', selectedPlanData);
    console.log('✅ Price ID confirmed:', selectedPlanData.priceId);
    
    setSelectedPlan(selectedPlanData);
    setPayOpen(true);
  };

  return (
    open && (
      <div className="upgrade-plan-modal" onClick={handleClose}>
        <div className="upgrade-plan-modal__inner">
          <div className="upgrade-plan-modal__inner__title">Upgrade plan</div>

          <select 
            name="currency" 
            id="currency"
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            disabled={loading}
          >
            {currencyOptions.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.name}
              </option>
            ))}
          </select>

          {loading ? (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              Loading plans and mapping price IDs...
            </div>
          ) : (
            subscriptionPlans.map((currencyPlan) => (
              Object.entries(currencyPlan.plans).map(([planType, planDetails]) => (
                <div
                  key={`${currencyPlan.currency}-${planType}`}
                  className={`upgrade-plan-modal__inner__card ${!planDetails.priceId ? 'disabled' : ''}`}
                  onClick={() => planDetails.priceId && handlePlanClick(currencyPlan, planType)}
                  style={{
                    opacity: planDetails.priceId ? 1 : 0.5,
                    cursor: planDetails.priceId ? 'pointer' : 'not-allowed'
                  }}
                >
                  <div className="upgrade-plan-modal__inner__card__title-group">
                    <div>{getPlanName(planType)}</div>
                    <div>{getSubscriptionPeriod(planType, planDetails.intervalCount)}</div>
                  </div>
                  <div className="upgrade-plan-modal__inner__card__price-group">
                    <div>
                      {getCurrencySymbol(currencyPlan.currency)}
                      {planDetails.amount.toLocaleString()}
                    </div>
                    {planDetails.priceId && (
                      <Image
                        alt=""
                        width={32}
                        height={32}
                        src={"/assets/icons/planArrowRight.svg"}
                        className="pointer"
                      />
                    )}
                  </div>
                  {/* Status indicator */}
                  <div style={{ fontSize: '10px', marginTop: '5px' }}>
                    {planDetails.priceId ? (
                      <span style={{ color: 'green' }}>✅ Ready</span>
                    ) : (
                      <span style={{ color: 'red' }}>❌ Price ID Missing</span>
                    )}
                  </div>
                </div>
              ))
            ))
          )}
        </div>

        <UpgradeModalPay 
          open={payOpen} 
          setOpen={setPayOpen} 
          planData={selectedPlan}
          userId={userId}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      </div>
    )
  );
}