import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UpgradeModalPay from "./upgradePlanModalPay";
import { getStripePlans } from "../apis/stripe";

export default function UpgradeModal({ open, setOpen }) {
  const [payOpen, setPayOpen] = useState(false);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [loading, setLoading] = useState(false);
  const [allPlans, setAllPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  console.log("subscriptionPlans", subscriptionPlans);
  
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

  // Function to process Stripe plans into organized structure
  const processStripePlans = (stripePlans) => {
    const plansByCurrency = {};
    
    stripePlans.forEach(plan => {
      const currency = plan.currency.toUpperCase();
      const amount = plan.amount / 100; // Convert cents to dollars
      
      // Determine plan type based on interval
      let planType;
      if (plan.interval === 'month' && plan.interval_count === 1) {
        planType = 'monthly';
      } else if (plan.interval === 'year' && plan.interval_count === 1) {
        planType = 'annually';
      } else if (plan.interval === 'month' && plan.interval_count === 3) {
        planType = 'quarterly';
      } else {
        return; // Skip unsupported intervals
      }
      
      // Initialize currency group if not exists
      if (!plansByCurrency[currency]) {
        plansByCurrency[currency] = {
          currency: currency,
          currencyId: currency, // You might want to map this to actual currency IDs
          plans: {}
        };
      }
      
      // Add plan to currency group
      plansByCurrency[currency].plans[planType] = {
        amount: amount,
        interval: plan.interval,
        intervalCount: plan.interval_count,
        priceId: plan.id, // Direct access to price ID
        active: plan.active
      };
      
      console.log(`📋 Processed plan: ${currency} ${planType} - ${amount} (ID: ${plan.id})`);
    });
    
    console.log('📦 Processed plans by currency:', plansByCurrency);
    return Object.values(plansByCurrency);
  };

  // Fetch all subscription plans on component mount
  useEffect(() => {
    const fetchAllPlans = async () => {
      try {
        setLoading(true);
        console.log('🔍 Fetching Stripe plans...');
        
        // Fetch Stripe plans directly
        const plansResponse = await getStripePlans();
        
        console.log('📦 Stripe plans response:', plansResponse);
        
        if (plansResponse.data?.data?.length > 0) {
          // Process the Stripe plans into our organized structure
          const processedPlans = processStripePlans(plansResponse.data.data);
          
          console.log('✅ Processed plans:', processedPlans);
          
          // Validate that we have price IDs
          let totalPlans = 0;
          
          processedPlans.forEach(currencyPlan => {
            Object.values(currencyPlan.plans).forEach(plan => {
              totalPlans++;
            });
          });
          
          console.log(`📊 Total plans processed: ${totalPlans}`);
          
          setAllPlans(processedPlans);
          
          // Set initial plans for USD
          const usdPlans = processedPlans.filter(plan => plan.currency === 'USD');
          console.log('💰 USD Plans:', usdPlans);
          setSubscriptionPlans(usdPlans);
        } else {
          console.error('❌ No plans found in Stripe response');
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
    
    // Filter from already loaded plans
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
              Loading subscription plans...
            </div>
          ) : (
            subscriptionPlans.map((currencyPlan) => (
              Object.entries(currencyPlan.plans).map(([planType, planDetails]) => (
                <div
                  key={`${currencyPlan.currency}-${planType}`}
                  className={`upgrade-plan-modal__inner__card ${!planDetails.active ? 'disabled' : ''}`}
                  onClick={() => planDetails.active && handlePlanClick(currencyPlan, planType)}
                  style={{
                    opacity: planDetails.active ? 1 : 0.5,
                    cursor: planDetails.active ? 'pointer' : 'not-allowed'
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
                    {planDetails.active && (
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
                    {planDetails.active ? (
                      <span style={{ color: 'green' }}>✅ Active</span>
                    ) : (
                      <span style={{ color: 'orange' }}>⚠️ Inactive</span>
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