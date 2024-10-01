import CustomLayout from "../../components/layout/custom-layout/CustomLayout";

const RefundsCancellation: React.FC = () => {
  return (
    <CustomLayout>
      <div className="bg-darkBg min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Refunds and Cancellation Policy</h1>
            <p className="text-gray-600 mb-4">Last updated: September 27, 2024</p>
            <p className="text-gray-700 mb-6">
              This Refunds and Cancellation Policy ("Policy") outlines the terms under which users may cancel their subscriptions and request refunds for the EarningEdge App (hereafter referred to as the "Service Provider"). By subscribing to the service, you agree to abide by this Policy.
            </p>

            <div className="space-y-8">
              {[
                {
                  title: "1. Subscription Details",
                  content: [
                    "The EarningEdge App offers a subscription plan priced at ₹2000 per month.",
                    "Subscriptions are processed through Razorpay and will automatically renew each month unless canceled."
                  ]
                },
                {
                  title: "2. Cancellation Policy",
                  content: [
                    "Users may cancel their subscription at any time through their account settings in the EarningEdge App.",
                    "Cancellations will take effect at the end of the current billing cycle, and users will continue to have access to the subscription features until that time.",
                    "To avoid being charged for the next billing cycle, cancellations must be completed before the renewal date."
                  ]
                },
                {
                  title: "3. Refund Policy",
                  content: [
                    "Refunds for the subscription fee are only available if requested within seven (7) days of the initial payment.",
                    "After this period, no refunds will be provided for any subscription fees.",
                    "To request a refund, users must contact the Service Provider via email at earningedge00@gmail.com. All refund requests will be reviewed and processed in 5 to 7 days."
                  ]
                },
                {
                  title: "4. Contact Information",
                  content: [
                    "For questions or concerns regarding the Refunds and Cancellation Policy, please contact us at earningedge00@gmail.com."
                  ]
                }
              ].map((section, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">{section.title}</h2>
                  {Array.isArray(section.content) ? (
                    section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-gray-700 mb-2">{paragraph}</p>
                    ))
                  ) : (
                    <p className="text-gray-700 mb-4">{section.content}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CustomLayout>
  );
};

export default RefundsCancellation;
