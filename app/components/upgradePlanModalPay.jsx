"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

// Safely initialize Stripe only when a publishable key exists
const hasStripeKey = !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise =
    typeof window !== "undefined" && hasStripeKey
        ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
        : null;

// Cookie utility function
const getCookie = (name) => {
    if (typeof window === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2)
        return decodeURIComponent(parts.pop().split(";").shift());
    return null;
};

// Add this new function after the getCookie function
const createSubscriptionRecord = async (subscriptionData) => {
    const token = getCookie("auth_token");

    const response = await fetch("/api/subscriptions/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(subscriptionData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
            errorData.message || "Failed to create subscription record"
        );
    }

    return response.json();
};

export default function UpgradeModalPay({
    open,
    setOpen,
    planData,
    onSuccess,
    onError,
}) {
    const [showStripeForm, setShowStripeForm] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [subscriptionId, setSubscriptionId] = useState("");
    const [isInitializing, setIsInitializing] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Get values from cookies
    const token = isClient ? getCookie("auth_token") : null;
    const userId = isClient ? getCookie("user_id") : null;
    const userEmail = isClient ? getCookie("user_email") : null;
    const userName = isClient ? getCookie("user_name") : null;

    // Updated handleSuccess function - simplified for Option 1
    const handleSuccess = async (paymentIntentId, subscriptionId) => {
        setPaymentStatus("success");
        setErrorMessage("");

        // Prepare subscription data for backend
        const subscriptionData = {
            subscriptionId: subscriptionId,
            paymentIntentId: paymentIntentId,
            planType: planData.name?.toLowerCase().includes("essential")
                ? "essential"
                : planData.name?.toLowerCase().includes("premier")
                ? "premier"
                : "pro",
            amount: planData.amount,
            currency: planData.currency,
            priceId: planData.priceId,
            userId: userId,
            userEmail: userEmail,
            userName: userName || planData.userName || "",
            status: "active",
            createdAt: new Date().toISOString(),
        };

        try {
            // Send subscription data to backend
            console.log(
                "📤 Sending subscription data to backend:",
                subscriptionData
            );
            const backendResponse = await createSubscriptionRecord(
                subscriptionData
            );
            console.log(
                "✅ Backend subscription record created:",
                backendResponse
            );

            // Check if backend returned a new auth token
            if (backendResponse.newAuthToken) {
                console.log("🔄 Updating auth token with subscription info");

                // Update the cookie with new token that includes subscription status
                document.cookie = `auth_token=${
                    backendResponse.newAuthToken
                }; path=/; max-age=${
                    30 * 24 * 60 * 60
                }; secure; samesite=strict`;

                console.log(
                    "✅ Auth token updated successfully - user now has subscription access"
                );
            }

            // Call parent success handler if provided
            if (onSuccess) {
                onSuccess({
                    subscriptionId: subscriptionId || paymentIntentId,
                    backendRecordId: backendResponse.id,
                    hasNewToken: !!backendResponse.newAuthToken,
                });
            }

            setTimeout(() => {
                setOpen(false);
                resetModal();
                // Reload to reflect new subscription status throughout the app
                window.location.reload();
            }, 3000);
        } catch (backendError) {
            console.error(
                "❌ Failed to create backend subscription record:",
                backendError
            );

            setErrorMessage(
                `Payment successful, but failed to save subscription record: ${backendError.message}`
            );

            if (onSuccess) {
                onSuccess({
                    subscriptionId: subscriptionId || paymentIntentId,
                    backendError: backendError.message,
                });
            }

            setTimeout(() => {
                setOpen(false);
                resetModal();
                window.location.reload();
            }, 3000);
        }
    };

    const handleError = (msg) => {
        setPaymentStatus("error");
        setErrorMessage(msg);

        // Call parent error handler if provided
        if (onError) {
            onError(msg);
        }
    };

    const resetModal = () => {
        setShowStripeForm(false);
        setPaymentStatus("");
        setErrorMessage("");
        setClientSecret("");
        setSubscriptionId("");
        setIsInitializing(false);
    };

    const validatePaymentData = () => {
        const errors = [];

        if (!token) errors.push("Authentication token missing");
        if (!userEmail) errors.push("User email missing");
        if (!planData?.priceId) errors.push("Price ID missing");
        if (!userId) errors.push("User ID missing");

        return errors;
    };

    const initializePayment = async () => {
        if (!isClient) return;

        const validationErrors = validatePaymentData();
        if (validationErrors.length > 0) {
            setErrorMessage(
                `Missing required information: ${validationErrors.join(", ")}`
            );
            return;
        }

        setIsInitializing(true);
        setErrorMessage("");
console.log("winning plan data", planData);

        try {
            const paymentData = {
                planType: planData.name?.toLowerCase().includes("essential")
                    ? "essential"
                    : planData.name?.toLowerCase().includes("premier")
                    ? "premier"
                    : "pro",
                amount: planData.amount,
                currency: planData.currency,
                priceId: planData.priceId,
                userId,
                userEmail,
                userName: userName || planData.userName || "",
            };

            console.log("🚀 Initializing payment with data:", paymentData);

            const response = await fetch("/api/create-subscription", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(paymentData),
            });

            console.log("📡 Response status:", response.status);
            console.log("📡 Response ok:", response.ok);

            // Get the response text first to see what we're actually getting
            const responseText = await response.text();
            console.log("📝 Raw response text:", responseText);

            let data;
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                console.error("❌ JSON parse error:", parseError);
                throw new Error(
                    `Server returned invalid JSON: ${responseText}`
                );
            }

            console.log("📦 Parsed response data:", data);

            if (!response.ok) {
                console.error("❌ HTTP Error:", response.status, data);
                throw new Error(
                    data.error || `HTTP error! status: ${response.status}`
                );
            }

            // Check the structure of the response
            console.log("🔍 Checking response structure:");
            console.log("- clientSecret exists:", !!data.clientSecret);
            console.log("- clientSecret value:", data.clientSecret);
            console.log("- subscriptionId exists:", !!data.subscriptionId);
            console.log("- subscriptionId value:", data.subscriptionId);

            if (data.clientSecret) {
                setClientSecret(data.clientSecret);
                setSubscriptionId(data.subscriptionId || "");
                setShowStripeForm(true);
            } else {
                // Log all available keys in the response
                console.error(
                    "❌ No clientSecret in response. Available keys:",
                    Object.keys(data)
                );
                throw new Error(
                    data.error || "No client secret received from server"
                );
            }
        } catch (error) {
            console.error("💥 Payment initialization error:", error);
            console.error("💥 Error stack:", error.stack);
            handleError(error.message || "Failed to initialize payment");
        } finally {
            setIsInitializing(false);
        }
    };

    useEffect(() => {
        if (!open) {
            resetModal();
        }
    }, [open]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [open]);

    if (!isClient) return null;

    return (
        open && (
            <div
                className='upgrade-plan-modal'
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                    padding: "20px",
                    overflowY: "auto",
                }}
            >
                <div
                    className='upgrade-plan-modal__inner'
                    style={{
                        backgroundColor: "white",
                        borderRadius: "12px",
                        width: "100%",
                        maxWidth: "500px",
                        maxHeight: "90vh",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                        margin: "auto",
                    }}
                >
                    <div
                        className='upgrade-plan-modal__inner__title-group'
                        style={{
                            padding: "24px 24px 0 24px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexShrink: 0,
                            borderBottom: "1px solid #e5e7eb",
                            paddingBottom: "16px",
                        }}
                    >
                        <div style={{ fontSize: "20px", fontWeight: "600" }}>
                            Upgrade plan
                        </div>
                        <Image
                            alt='Close'
                            width={32}
                            height={32}
                            src={"/assets/icons/close.svg"}
                            className='pointer'
                            onClick={() => setOpen(false)}
                            style={{ cursor: "pointer" }}
                        />
                    </div>

                        <div
                        className='upgrade-plan-modal__inner__content'
                        style={{
                            padding: "24px",
                            overflowY: "auto",
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: "24px",
                        }}
                    >
                        <div
                            className='upgrade-plan-modal__inner__plan-card'
                            style={{
                                border: "1px solid #e5e7eb",
                                borderRadius: "8px",
                                padding: "20px",
                            }}
                        >
                            <div
                                className='upgrade-plan-modal__inner__plan-card__title-group'
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "16px",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "600",
                                    }}
                                >
                                    {planData?.name || "Plan"}
                                </div>
                                <div
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "700",
                                        color: "#059669",
                                    }}
                                >
                                    {planData?.currencySymbol || "$"}
                                    {planData?.amount || "0"} /{" "}
                                    {planData?.interval || "month"}
                                </div>
                            </div>
                            <ul
                                style={{
                                    listStyle: "none",
                                    padding: 0,
                                    margin: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                }}
                            >
                                <li
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                    }}
                                >
                                    <span style={{ color: "#059669" }}>✓</span>
                                    Unlimited access to the full database.
                                </li>
                                <li
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                    }}
                                >
                                    <span style={{ color: "#059669" }}>✓</span>
                                    Full database access with intelligent
                                    matchmaking and insights.
                                </li>
                                <li
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                    }}
                                >
                                    <span style={{ color: "#059669" }}>✓</span>
                                    Vetted connections.
                                </li>
                                <li
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                    }}
                                >
                                    <span style={{ color: "#059669" }}>✓</span>
                                    Quality ratings.
                                </li>
                                <li
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                    }}
                                >
                                    <span style={{ color: "#059669" }}>✓</span>
                                    Advanced search.
                                </li>
                            </ul>
                        </div>

                        {paymentStatus === "success" && (
                            <div
                                className='payment-success-message'
                                style={{
                                    backgroundColor: "#ecfdf5",
                                    border: "1px solid #10b981",
                                    borderRadius: "8px",
                                    padding: "16px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                }}
                            >
                                <span style={{ fontSize: "20px" }}>✅</span>
                                <div>
                                    <div
                                        style={{
                                            fontWeight: "600",
                                            color: "#065f46",
                                        }}
                                    >
                                        Payment Successful!
                                    </div>
                                    <div
                                        style={{
                                            color: "#047857",
                                            fontSize: "14px",
                                        }}
                                    >
                                        Your subscription has been activated.
                                        Redirecting...
                                    </div>
                                    {subscriptionId && (
                                        <div
                                            style={{
                                                color: "#047857",
                                                fontSize: "12px",
                                                marginTop: "4px",
                                            }}
                                        >
                                            Subscription ID: {subscriptionId}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {paymentStatus === "error" && errorMessage && (
                            <div
                                className='payment-error-message'
                                style={{
                                    backgroundColor: "#fef2f2",
                                    border: "1px solid #f87171",
                                    borderRadius: "8px",
                                    padding: "16px",
                                    color: "#991b1b",
                                }}
                            >
                                <div style={{ fontWeight: "600" }}>
                                    ❌ Payment Failed
                                </div>
                                <div
                                    style={{
                                        fontSize: "14px",
                                        marginTop: "4px",
                                    }}
                                >
                                    {errorMessage}
                                </div>
                            </div>
                        )}

                        {!paymentStatus && errorMessage && (
                            <div
                                className='payment-error-message'
                                style={{
                                    backgroundColor: "#fffbeb",
                                    border: "1px solid #f59e0b",
                                    borderRadius: "8px",
                                    padding: "16px",
                                    color: "#92400e",
                                }}
                            >
                                <div style={{ fontWeight: "600" }}>
                                    ⚠️ Error
                                </div>
                                <div
                                    style={{
                                        fontSize: "14px",
                                        marginTop: "4px",
                                    }}
                                >
                                    {errorMessage}
                                </div>
                            </div>
                        )}

                        {isInitializing && (
                            <div
                                className='payment-initializing-message'
                                style={{
                                    backgroundColor: "#f0f9ff",
                                    border: "1px solid #3b82f6",
                                    borderRadius: "8px",
                                    padding: "16px",
                                    color: "#1e40af",
                                    textAlign: "center",
                                }}
                            >
                                <div style={{ fontWeight: "600" }}>
                                    🔄 Initializing subscription payment...
                                </div>
                                <div
                                    style={{
                                        fontSize: "14px",
                                        marginTop: "4px",
                                    }}
                                >
                                    Please wait while we prepare your
                                    subscription.
                                </div>
                            </div>
                        )}

                        {!showStripeForm &&
                            paymentStatus === "" &&
                            !isInitializing && (
                                <div
                                    className='upgrade-plan-modal__inner__button-group'
                                    style={{
                                        display: "flex",
                                        gap: "12px",
                                        flexDirection: "column",
                                    }}
                                >
                                    <button
                                        disabled={!planData?.priceId}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "8px",
                                            padding: "12px 24px",
                                            backgroundColor: !planData?.priceId
                                                ? "#e5e7eb"
                                                : "#059669",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "8px",
                                            fontSize: "16px",
                                            fontWeight: "600",
                                            cursor: !planData?.priceId
                                                ? "not-allowed"
                                                : "pointer",
                                        }}
                                    >
                                        <Image
                                            alt='Paystack'
                                            width={16}
                                            height={16}
                                            src={"/assets/icons/paystack.svg"}
                                            className='pointer'
                                        />
                                        Paystack
                                    </button>
                                    <button
                                        onClick={initializePayment}
                                        disabled={
                                            isInitializing || !planData?.priceId || !hasStripeKey
                                        }
                                        style={{
                                            padding: "12px 24px",
                                            backgroundColor:
                                                isInitializing ||
                                                !planData?.priceId ||
                                                !hasStripeKey
                                                    ? "#e5e7eb"
                                                    : "#6366f1",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "8px",
                                            fontSize: "16px",
                                            fontWeight: "600",
                                            cursor:
                                                isInitializing ||
                                                !planData?.priceId ||
                                                !hasStripeKey
                                                    ? "not-allowed"
                                                    : "pointer",
                                        }}
                                    >
                                        {isInitializing
                                            ? "Initializing..."
                                            : "Stripe"}
                                        {!planData?.priceId &&
                                            " (Price ID Missing)"}
                                        {!hasStripeKey &&
                                            " (Publishable key missing)"}
                                    </button>
                                </div>
                            )}

                        {showStripeForm &&
                            paymentStatus === "" &&
                            clientSecret &&
                            hasStripeKey &&
                            stripePromise && (
                                <Elements
                                    stripe={stripePromise}
                                    options={{
                                        clientSecret,
                                        appearance: {
                                            theme: "stripe",
                                        },
                                    }}
                                >
                                    <CheckoutForm
                                        planData={planData}
                                        onSuccess={(paymentIntentId) =>
                                            handleSuccess(
                                                paymentIntentId,
                                                subscriptionId
                                            )
                                        }
                                        onError={handleError}
                                        setShowStripeForm={setShowStripeForm}
                                        clientSecret={clientSecret}
                                    />
                                </Elements>
                            )}
                        {showStripeForm && clientSecret && !hasStripeKey && (
                            <div
                                style={{
                                    backgroundColor: "#fff7ed",
                                    border: "1px solid #fb923c",
                                    borderRadius: "8px",
                                    padding: "16px",
                                    color: "#c2410c",
                                }}
                            >
                                Stripe publishable key is missing. Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY and reload.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    );
}

const CheckoutForm = ({
    planData,
    onSuccess,
    onError,
    setShowStripeForm,
    clientSecret,
}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsProcessing(true);
        setErrorMessage("");

        try {
            if (!stripe || !elements || !clientSecret) {
                throw new Error(
                    "Payment system is not ready. Please try again."
                );
            }

            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                redirect: "if_required",
                confirmParams: {
                    return_url:
                        window.location.origin + "/subscription-success",
                },
            });

            if (error) {
                console.error("Payment confirmation error:", error);
                throw new Error(error.message);
            } else if (paymentIntent) {
                console.log("Payment intent status:", paymentIntent.status);

                if (paymentIntent.status === "succeeded") {
                    // Extract subscription ID from payment intent metadata
                    const subscriptionId =
                        paymentIntent.metadata?.subscription_id;
                    console.log(
                        "✅ Payment succeeded! Subscription ID:",
                        subscriptionId
                    );
                    onSuccess && onSuccess(paymentIntent.id, subscriptionId);
                } else if (paymentIntent.status === "processing") {
                    const subscriptionId =
                        paymentIntent.metadata?.subscription_id;
                    console.log(
                        "🔄 Payment processing! Subscription ID:",
                        subscriptionId
                    );
                    onSuccess && onSuccess(paymentIntent.id, subscriptionId);
                } else {
                    throw new Error(
                        `Payment status: ${paymentIntent.status}. Please contact support.`
                    );
                }
            } else {
                throw new Error("Payment was not completed. Please try again.");
            }
        } catch (error) {
            console.error("Payment processing error:", error);
            setErrorMessage(error.message);
            onError && onError(error.message);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='stripe-checkout-form'
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
            }}
        >
            <PaymentElement />
            <button
                type='submit'
                disabled={!stripe || isProcessing}
                className='stripe-submit-button'
                style={{
                    padding: "12px 24px",
                    backgroundColor:
                        !stripe || isProcessing ? "#e5e7eb" : "#6366f1",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: !stripe || isProcessing ? "not-allowed" : "pointer",
                }}
            >
                {isProcessing
                    ? "Processing payment..."
                    : `Subscribe for ${planData?.currencySymbol || "$"}${
                          planData?.amount || "0"
                      }`}
            </button>
            {errorMessage && (
                <div
                    className='stripe-error-message'
                    style={{
                        backgroundColor: "#fef2f2",
                        border: "1px solid #f87171",
                        borderRadius: "8px",
                        padding: "12px",
                        color: "#991b1b",
                        fontSize: "14px",
                    }}
                >
                    ❌ {errorMessage}
                </div>
            )}
        </form>
    );
};
