"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getStripePlans } from "../apis/stripe";
import UpgradeModalPay from "./upgradePlanModalPay";

export default function PricingInner() {
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [loading, setLoading] = useState(false);
    const [allPlans, setAllPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [payOpen, setPayOpen] = useState(false);
    
    // Get user info from Redux store
    const userInfo = useSelector(state => state.auth.userInfo);
    const userId = userInfo?.id || userInfo?.userId || userInfo?.user_id;

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
                    currencyId: currency,
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
        });
        
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
                    
                    setAllPlans(processedPlans);
                    
                    // Plans are now available in allPlans state
                    console.log('💰 Processed plans:', processedPlans);
                } else {
                    console.error('❌ No plans found in Stripe response');
                }
            } catch (error) {
                console.error('💥 Error fetching subscription plans:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllPlans();
    }, []);

    // Handle currency change
    const handleCurrencyChange = (e) => {
        const newCurrency = e.target.value;
        setSelectedCurrency(newCurrency);
        
        console.log(`🔄 Changing currency to: ${newCurrency}`);
        
        // Currency change updates the selectedCurrency, which triggers re-render with new plans
        console.log(`💱 Changed currency to: ${newCurrency}`);
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

    // Get plan subtitle
    const getPlanSubtitle = (planType) => {
        switch (planType) {
            case 'monthly':
                return 'Perfect for users needing flexibility or those testing the platform\'s capabilities';
            case 'annually':
                return 'Designed for committed users, this plan offers substantial savings for a medium-term strategy.';
            case 'quarterly':
                return 'Designed for committed users, offering significant savings over 6 months';
            default:
                return '';
        }
    };

    // Get plan features
    const getPlanFeatures = (planType) => {
        const baseFeatures = [
            'Unlimited access to the full database.',
            'Full database access with intelligent matchmaking and insights',
            'Vetted connections',
            'Quality ratings',
            'Advanced search'
        ];

        if (planType === 'annually') {
            return ['Save 15% per month', ...baseFeatures];
        } else if (planType === 'quarterly') {
            return ['Save 30% per month', ...baseFeatures];
        }
        return baseFeatures;
    };

    // Handle plan selection
    const handlePlanClick = (planType, planDetails, currencyPlan) => {
        if (!planDetails.active) {
            console.error('🚨 Plan is not active!');
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
            planType: planType,
            userEmail: userInfo?.email,
            userName: userInfo?.name || `${userInfo?.firstName || ''} ${userInfo?.lastName || ''}`.trim(),
        };
        
        console.log('🎪 Selected Plan Data:', selectedPlanData);
        setSelectedPlan(selectedPlanData);
        setPayOpen(true);
    };

    // Success and error handlers for payment
    const handlePaymentSuccess = (paymentData) => {
        console.log("🎉 Payment successful:", paymentData);
        setPayOpen(false);
        // Optionally reload or redirect
        if (paymentData.hasNewToken) {
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    };

    const handlePaymentError = (errorMessage) => {
        console.error("❌ Payment error:", errorMessage);
        setPayOpen(false);
    };

    // Find the currency plan for the selected currency
    const currencyPlan = allPlans.find(plan => plan.currency === selectedCurrency);
    const plans = currencyPlan?.plans || {};

    // Define plan order for display
    const planOrder = ['monthly', 'annually', 'quarterly'];

    return (
        <>
            <select 
                name="currency" 
                id="currency"
                value={selectedCurrency}
                onChange={handleCurrencyChange}
                disabled={loading}
                style={{ 
                    padding: '10px', 
                    borderRadius: '8px', 
                    border: '1px solid #e5e7eb',
                    marginBottom: '20px',
                    fontSize: '16px'
                }}
            >
                {currencyOptions.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                        {currency.name}
                    </option>
                ))}
            </select>

            {loading ? (
                <div style={{ padding: '40px', textAlign: 'center' }}>
                    Loading subscription plans...
                </div>
            ) : (
                <div className="pricing__inner__cards">
                    {planOrder.map((planType) => {
                        const planDetails = plans[planType];
                        if (!planDetails) return null;

                        const isPopular = planType === 'annually';
                        const features = getPlanFeatures(planType);

                        return (
                            <div 
                                key={planType}
                                className="pricing__inner__cards__card"
                                style={{
                                    opacity: planDetails.active ? 1 : 0.6,
                                }}
                            >
                                <div className="pricing__inner__cards__card__title">
                                    {isPopular ? (
                                        <>
                                            <div>{getPlanName(planType)}</div>
                                            <Image
                                                alt="Popular"
                                                width={64}
                                                height={24}
                                                src={"/assets/icons/popular.svg"}
                                            />
                                        </>
                                    ) : (
                                        <div>{getPlanName(planType)}</div>
                                    )}
                                </div>
                                <div className="pricing__inner__cards__card__title-group">
                                    <div>
                                        {getCurrencySymbol(selectedCurrency)}
                                        {planDetails.amount.toLocaleString()}
                                    </div>
                                    <div>{getSubscriptionPeriod(planType, planDetails.intervalCount)}</div>
                                </div>

                                <div className="pricing__inner__cards__card__subtitle">
                                    {getPlanSubtitle(planType)}
                                </div>

                                <button
                                    onClick={() => planDetails.active && currencyPlan && handlePlanClick(planType, planDetails, currencyPlan)}
                                    disabled={!planDetails.active}
                                    style={{
                                        cursor: planDetails.active ? 'pointer' : 'not-allowed',
                                        opacity: planDetails.active ? 1 : 0.5
                                    }}
                                >
                                    Choose plan
                                </button>

                                <div className="pricing__inner__cards__card__features-title">Features</div>

                                <div className="pricing__inner__cards__card__features-grid">
                                    {features.map((feature, index) => (
                                        <React.Fragment key={index}>
                                            <Image
                                                alt=""
                                                width={24}
                                                height={24}
                                                src={"/assets/icons/tick.svg"}
                                            />
                                            <div>{feature}</div>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <UpgradeModalPay 
                open={payOpen} 
                setOpen={setPayOpen} 
                planData={selectedPlan}
                userId={userId}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
            />
        </>
    )
}