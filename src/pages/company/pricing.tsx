  import React from "react";
  import { Check } from "lucide-react";
  import CustomLayout from "../../components/layout/custom-layout/CustomLayout";

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

  const PricingCard: React.FC<PricingCardProps> = ({ tier }) => (
    <div
      className={`rounded-xl shadow-lg transform transition duration-500 hover:scale-105 ${
        tier.isPopular
          ? "border-4 border-none bg-gradient-to-br from-blue-800 to-blue-700"
          : "bg-gray-900"
      }`}
    >
      <div className="px-6 py-8 text-center">
        <h3
          className={`text-2xl font-bold ${
            tier.isPopular ? "text-white" : "text-gray-200"
          }`}
        >
          {tier.name}
        </h3>
        <div className="mt-4">
          <span
            className={`text-5xl font-extrabold ${
              tier.isPopular ? "text-white" : "text-blue-400"
            }`}
          >
            {tier.price}
          </span>
          {tier.price !== "Free" && (
            <span
              className={`text-xl font-medium ${
                tier.isPopular ? "text-gray-200" : "text-gray-400"
              }`}
            >
              /month
            </span>
          )}
        </div>
      </div>
      <div className="px-6 py-6">
        <ul className="space-y-4">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check
                className={`h-6 w-6 mr-3 ${
                  feature.included ? "text-green-500" : "text-gray-500"
                }`}
              />
              <span
                className={`text-lg ${
                  feature.included ? "text-gray-100" : "text-gray-500"
                }`}
              >
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 py-6 text-center">
        <button
          className={`w-full py-3 px-4 rounded-lg font-semibold transition duration-300 ${
            tier.isPopular
              ? "bg-white text-blue-500 hover:bg-gray-200"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {tier.buttonText}
        </button>
      </div>
    </div>
  );

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
        price: "₹2000",
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
        <div className="bg-darkBg min-h-screen py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center -my-5">
            <h2 className="text-3xl font-extrabold text-gray-200 sm:text-4xl">
              Choose the Right Plan for You
            </h2>

            
            <p className="mt-4 text-xl text-gray-600">
               Unlock your investment potential with our tailored pricing options
             </p>
            </div>
            <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
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
  // import React from 'react';
  // import { Check } from 'lucide-react';
  // import CustomLayout from '../../components/layout/custom-layout/CustomLayout';
  
  // interface Feature {
  //   name: string;
  //   included: boolean;
  // }
  
  // interface PricingTier {
  //   name: string;
  //   price: string;
  //   features: Feature[];
  //   isPopular: boolean;
  //   buttonText: string;
  // }
  
  // interface PricingCardProps {
  //   tier: PricingTier;
  // }
  
  // const PricingCard: React.FC<PricingCardProps> = ({ tier }) => (
  
  //   <div className={`bg-darkSecondary rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 ${tier.isPopular ? 'border-4 border-blue-500' : ''}`}>
  //     <div className={`px-6 py-8 ${tier.isPopular ? 'bg-blue-500 text-white' : 'bg-gray-800'}`}>
  //       <h3 className="text-2xl font-semibold text-center text-white">{tier.name}</h3>
  //       <div className="mt-4 text-center">
  //         <span className="text-4xl font-bold text-white">{tier.price}</span>
  //         {tier.price !== 'Free' && <span className="text-xl font-medium">/month</span>}
  //       </div>
  //     </div>
  //     <div className="px-6 py-8">
  //       <ul className="space-y-4">
  //         {tier.features.map((feature, index) => (
  //           <li key={index} className="flex items-center">
  //             <Check className={`h-5 w-5 mr-2 ${feature.included ? 'text-green-500' : 'text-gray-300'}`} />
  //             <span className={feature.included ? 'text-gray-200' : 'text-gray-400'}>{feature.name}</span>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //     <div className="px-6 py-8">
  //       {/* <button className={`w-full py-2 px-4 rounded-full font-semibold text-white transition duration-300 ${tier.isPopular ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}`}>
  //         {tier.buttonText}
  //       </button> */}
  //     </div>
  //   </div>
  // );
  
  // const PricingPage: React.FC = () => {
  //   const pricingTiers: PricingTier[] = [
  //     {
  //       name: "Free",
  //       price: "Free",
  //       features: [
  //         { name: '30 days trial', included: true },
  //         { name: 'Journaling', included: true },
  //         { name: 'News feed', included: true },
  //         { name: 'Stock screener', included: true },
  //         { name: 'Basic course access', included: true },
  //         { name: 'Community forum access', included: true },
  //         { name: '24/7 premium support', included: false },
  //         { name: 'Unlimited course access', included: false },
  //         { name: 'Live mentorship sessions', included: false },
  //         { name: 'Advanced stock analytics', included: false },
  //         { name: 'Personalized investment strategies', included: false },
  //         { name: 'Priority feature updates', included: false },
  //       ],
  //       isPopular: false,
  //       buttonText: "Try for Free"
  //     },
  //     {
  //       name: "Pro",
  //       price: "Rs. 2000",
  //       features: [
  //         { name: '30 days trial', included: true },
  //         { name: 'Journaling', included: true },
  //         { name: 'News feed', included: true },
  //         { name: 'Stock screener', included: true },
  //         { name: 'Basic course access', included: true },
  //         { name: 'Community forum access', included: true },
  //         { name: '24/7 premium support', included: true },
  //         { name: 'Unlimited course access', included: true },
  //         { name: 'Live mentorship sessions', included: true },
  //         { name: 'Advanced stock analytics', included: true },
  //         { name: 'Personalized investment strategies', included: true },
  //         { name: 'Priority feature updates', included: true },
  //       ],
  //       isPopular: true,
  //       buttonText: "Get Started"
  //     }
  //   ];
  
  //   return (
  //     <CustomLayout>
  
  //     <div className=" bg-darkBg min-h-screen py-16 px-4 sm:px-6 lg:px-8">
  //       <div className="max-w-7xl mx-auto">
  //         <div className="text-center">
  //           <h2 className="text-3xl font-extrabold text-gray-200 sm:text-4xl">
  //             Choose the Right Plan for You
  //           </h2>
  //           <p className="mt-4 text-xl text-gray-600">
  //             Unlock your investment potential with our tailored pricing options
  //           </p>
  //         </div>
  //         <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
  //           {pricingTiers.map((tier, index) => (
  //               <PricingCard key={index} tier={tier} />
  //             ))}
  //         </div>
  //       </div>
  //     </div>
  //             </CustomLayout>
  //   );
  // };
  
  // export default PricingPage;