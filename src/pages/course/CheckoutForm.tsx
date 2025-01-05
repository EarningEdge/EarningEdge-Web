import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import type { StripeCardElementOptions, StripeElementChangeEvent } from "@stripe/stripe-js";
import { useAppSelector } from "@/redux/hooks";
import { Loader2 } from "lucide-react";
import axios from "axios";

interface PaymentStatus {
  error: string;
  success: string;
}

interface CheckoutFormProps {
  setIsSubscribed: (value: boolean) => void;
  isSubscribed: boolean;
}


const LoadingState = () => (
  <div className="max-w-md mx-auto p-6 rounded-lg shadow flex flex-col items-center justify-center space-y-4">
    <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
  </div>
);

const CARD_OPTIONS: StripeCardElementOptions = {
  style: {
    base: {
      color: "white",
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

const CheckoutForm: React.FC<CheckoutFormProps> = ({ setIsSubscribed, isSubscribed }) => {
  const [status, setStatus] = useState<PaymentStatus>({ error: "", success: "" });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [cardComplete, setCardComplete] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(!isSubscribed);
  const enrollmentAmount = 2999;
  const BACKEND_URL = import.meta.env.VITE_BASE_URL;
  const { user } = useAppSelector((state) => state.auth);

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

    if (!cardComplete) {
      setStatus({ error: "Please complete card details", success: "" });
      return;
    }

    setIsProcessing(true);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card element not found");
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        throw new Error(error.message);
      }

      const response = await axios.post(`${BACKEND_URL}/api/v1/user/enrollmentPayment`, {
        transactionId: paymentMethod.id,
        userId: user?._id,
        price: enrollmentAmount,
      });

      if (!response.status) {
        setShowContent(true)
        throw new Error("Payment failed on server");
      }

      setShowContent(false)
      setIsSubscribed(true);
      setStatus({ error: "", success: "Payment successful!" });

      // Clear the card input
      cardElement.clear();

    } catch (err) {
      setStatus({
        error: err instanceof Error ? err.message : "Payment failed",
        success: ""
      });
      setIsSubscribed(true);
      setShowContent(false)
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {showContent ? (
        <div style={{ backgroundColor: '#161616' }} className="max-w-md mx-auto p-6 rounded-lg shadow">

          <h2 className="text-2xl text-center font-bold text-gray-100 ">Payment Details</h2>
          <p className="text-sm text-center text-blue-300 mb-6 ">Please subscribe to access the courses</p>

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
              className={`w-full py-2 px-4 rounded-md text-white font-medium transition duration-300
              ${(!stripe || !cardComplete || isProcessing)
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </span>
              ) : (
                `Pay ${enrollmentAmount}₹`
              )}
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-400 text-center">
            Secured by Stripe
          </p>
        </div>
      ) : (
        <LoadingState />
      )}
    </>
  );
};

export default CheckoutForm;