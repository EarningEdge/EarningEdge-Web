import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import type { StripeCardElementOptions, StripeElementChangeEvent } from "@stripe/stripe-js";

interface PaymentStatus {
  error: string;
  success: string;
}

const CARD_OPTIONS: StripeCardElementOptions = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};

const CheckoutForm: React.FC = () => {
  const [status, setStatus] = useState<PaymentStatus>({ error: "", success: "" });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [cardComplete, setCardComplete] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleCardChange = (event: StripeElementChangeEvent) => {
    setCardComplete(event.complete);
    if (event.error) {
      setStatus({ error: event.error.message, success: "" });
    } else {
      setStatus({ error: "", success: "" });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ error: "", success: "" });

    if (!stripe || !elements) {
      setStatus({ error: "Stripe has not been initialized", success: "" });
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setStatus({ error: "Card element not found", success: "" });
      setIsProcessing(false);
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setStatus({ error: "Something went wrong", success: "" });
        return;
      }

      // Process payment with your backend
      // const response = await fetch('/api/payment', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
      // });

      setStatus({ error: "", success: "Payment successful!" });
      console.log("PaymentMethod:", paymentMethod);

    } catch (err) {
      setStatus({
        error: err instanceof Error ? err.message : "Payment failed",
        success: ""
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="rounded-md border border-gray-300 p-4">
          <CardElement
            options={CARD_OPTIONS}
            onChange={handleCardChange}
            className="p-2"
          />
        </div>

        {status.error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md">
            {status.error}
          </div>
        )}

        {status.success && (
          <div className="bg-green-50 text-green-700 p-3 rounded-md">
            {status.success}
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || !cardComplete || isProcessing}
          className={`w-full py-2 px-4 rounded-md text-white font-medium
            ${(!stripe || !cardComplete || isProcessing)
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-500 text-center">
        Secured by Stripe
      </p>
    </div>
  );
};

export default CheckoutForm;