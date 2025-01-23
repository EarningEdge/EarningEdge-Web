import { Check } from "lucide-react";
import CustomLayout from "../../components/layout/custom-layout/CustomLayout";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
interface Feature {
  name: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  price: string;
  features: Feature[];
  isPopular: boolean;
  buttonText: string;
}

interface PricingCardProps {
  tier: PricingTier;
}

const PricingCard: React.FC<PricingCardProps> = ({ tier }) => {
  // const STRIPE_KEY =
  //   "pk_test_51QfxbRKynIN2V9qvzA7RDZhV3uZ8wDpigkARpEHrEWf2aWFL3pvHbwRUpaYhQwrwTLvYCB1rHxhiSyv1R8Ixq0wt002BZaUpoX";
    const {  user } = useAppSelector((state) => state.auth);
    
    const handleProButtonClick = async (): Promise<void> => {
      try {
        console.log("user: ", user);
        // if(user?.planStatus === 'active'){
        //   return;
        // }
        // if(user?.planStatus === 'canceled'){
        //   window.location.href = '/manage-subscription'
        // }

        const res = await axios.post<{ url: string }>(
          `${import.meta.env.VITE_BASE_URL}/api/v1/plans/create-checkout-session`,{userId:user?._id},
        );
        
        const { url } = res.data; // Extract the URL from the response
        window.location.href = url; // Navigate to the URL
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.response?.data || error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };

  return (
    <div
      className={`bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-xl shadow-md hover:shadow-xl transform transition duration-500 hover:scale-105`}
    >
      <div className="px-6 py-8 text-center">
        <h3
          className={`text-2xl font-semibold ${
            tier.isPopular ? "text-blue-400" : "text-white"
          }`}
        >
          {tier.name}
        </h3>
        <div className="mt-4">
          <span
            className={`text-5xl font-extrabold ${
              tier.isPopular ? "text-blue-500" : "text-white"
            }`}
          >
            {tier.price}
          </span>
          {tier.price !== "Free" && (
            <span className="text-lg font-medium text-gray-400">/month</span>
          )}
        </div>
      </div>
      <div className="px-6 py-8">
        <ul className="space-y-4">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check
                className={`h-5 w-5 mr-2 ${
                  feature.included ? "text-green-500" : "text-gray-600"
                }`}
              />
              <span
                className={`${
                  feature.included
                    ? "text-gray-200"
                    : "text-gray-500 line-through"
                }`}
              >
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 py-6 text-center">
      {tier.name === "Pro" ? (
              <button
                onClick={handleProButtonClick}
                className="w-full py-3 px-6 rounded-lg font-semibold text-white transition duration-300 bg-blue-600 hover:bg-blue-500"
              >
            {user?.planStatus === 'active' ? `Subscribed` : user?.planStatus === 'canceled' ? `Activate` : `Get Started`}
            </button>
          //   
        ) : (
          <button
            className="w-full py-3 px-6 rounded-lg font-semibold text-white transition duration-300 bg-gray-700 hover:bg-gray-600"
          >
            {tier.buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

const PricingPage: React.FC = () => {
  const pricingTiers: PricingTier[] = [
    {
      name: "Free",
      price: "Free",
      features: [
        { name: "30 days trial", included: true },
        { name: "Journaling", included: true },
        { name: "News feed", included: true },
        { name: "Stock screener", included: true },
        { name: "Basic course access", included: true },
        { name: "Community forum access", included: true },
        { name: "24/7 premium support", included: false },
        { name: "Unlimited course access", included: false },
        { name: "Live mentorship sessions", included: false },
        { name: "Advanced stock analytics", included: false },
        { name: "Personalized investment strategies", included: false },
        { name: "Priority feature updates", included: false },
      ],
      isPopular: false,
      buttonText: "Try for Free",
    },
    {
      name: "Pro",
      price: "Rs. 2000",
      features: [
        { name: "30 days trial", included: true },
        { name: "Journaling", included: true },
        { name: "News feed", included: true },
        { name: "Stock screener", included: true },
        { name: "Basic course access", included: true },
        { name: "Community forum access", included: true },
        { name: "24/7 premium support", included: true },
        { name: "Unlimited course access", included: true },
        { name: "Live mentorship sessions", included: true },
        { name: "Advanced stock analytics", included: true },
        { name: "Personalized investment strategies", included: true },
        { name: "Priority feature updates", included: true },
      ],
      isPopular: true,
      buttonText: "Get Started",
    },
  ];

  return (
    <CustomLayout>
      <div className="bg-gray-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-white">
              Choose the Right Plan for You
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Unlock your investment potential with our tailored pricing options
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
            {pricingTiers.map((tier, index) => (
              <PricingCard key={index} tier={tier} />
            ))}
          </div>
        </div>
      </div>
    </CustomLayout>
  );
};

export default PricingPage;
