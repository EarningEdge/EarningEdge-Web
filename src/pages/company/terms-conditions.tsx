import CustomLayout from "../../components/layout/custom-layout/CustomLayout";


const TermsAndConditions = () => {
  return (
    <CustomLayout>
    <div className="bg-darkBg  min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>
          <p className="text-gray-600 mb-4">Last updated: September 27, 2024</p>
          
          <p className="text-gray-700 mb-6">
            These Terms and Conditions ("Terms") govern your use of the EarningEdge Web App (hereafter referred to as the "Web Application"), developed by EarningEdge (hereafter referred to as the "Service Provider"). By accessing or using the Web Application, you agree to these Terms.
          </p>

          <div className="space-y-8">
            {[
              {
                title: "1. Acceptance of Terms",
                content: "By accessing or using the Web Application, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, please refrain from using the Web Application."
              },
              {
                title: "2. Service Description",
                content: "The Web Application is offered as a Freemium service, with both free and paid features available. Some features may require payment for access."
              },
              {
                title: "3. User Responsibilities",
                content: "As a user of the Web Application, you agree to:",
                list: [
                  "Provide accurate and up-to-date information when creating an account",
                  "Use the Web Application for lawful purposes only",
                  "Keep your account credentials confidential and notify the Service Provider of any unauthorized use"
                ]
              },
              {
                title: "4. Dhan Broker Integration",
                content: "By connecting your Dhan Broker account to the Web Application, you agree to:",
                list: [
                  "Provide accurate and legitimate information, including access tokens and keys",
                  "Use this integration in accordance with Dhan's terms and conditions",
                  "Understand that access tokens and keys will be encrypted and stored securely by the Service Provider"
                ]
              },
              {
                title: "5. Subscription and Payments",
                content: "The Web Application offers paid features that may require a subscription or one-time payment. By purchasing any service or feature:",
                list: [
                  "You agree to pay the applicable fees",
                  "Subscriptions are automatically renewed unless canceled before the renewal date",
                  "Refunds will be provided only under specific conditions, as per applicable laws"
                ]
              },
              {
                title: "6. License to Use",
                content: "The Service Provider grants you a limited, non-exclusive, non-transferable, revocable license to use the Web Application for personal, non-commercial purposes. You agree not to:",
                list: [
                  "Modify, distribute, or reverse-engineer the Web Application",
                  "Reproduce or copy any part of the Web Application without prior written consent from the Service Provider"
                ]
              },
              {
                title: "7. User-Generated Content",
                content: [
                  "The Web Application may allow users to upload, store, or share content. By posting content, you grant the Service Provider a worldwide, non-exclusive, royalty-free license to use, distribute, and display that content.",
                  "You are solely responsible for the content you post and agree not to upload any content that:",
                  "Is unlawful, defamatory, or harmful",
                  "Infringes the rights of third parties",
                  "The Service Provider reserves the right to remove content that violates these Terms."
                ]
              },
              {
                title: "8. Third-Party Services",
                content: "The Web Application may integrate third-party services (e.g., Dhan Broker). The Service Provider is not responsible for the availability, performance, or policies of these third-party services. Users are encouraged to review the privacy policies and terms of the third-party services they use."
              },
              {
                title: "9. Termination",
                content: "The Service Provider may terminate or suspend your access to the Web Application at any time, with or without notice, for any reason, including if you violate these Terms."
              },
              {
                title: "10. Disclaimer of Warranties",
                content: [
                  "The Web Application is provided \"AS IS\" and without warranties of any kind. The Service Provider makes no representations or warranties:",
                  "That the Web Application will be uninterrupted or error-free",
                  "Regarding the security, accuracy, or reliability of the Web Application"
                ]
              },
              {
                title: "11. Limitation of Liability",
                content: "To the maximum extent permitted by law, the Service Provider is not liable for any indirect, incidental, or consequential damages resulting from your use or inability to use the Web Application."
              },
              {
                title: "12. Changes to the Terms",
                content: "The Service Provider reserves the right to modify these Terms at any time. Changes will be posted within the Web Application or communicated via email. Continued use of the Web Application after such changes constitutes your acceptance of the new Terms."
              },
              {
                title: "13. Governing Law",
                content: "These Terms are governed by and construed in accordance with the laws of [Your Country/State]. You agree to submit to the exclusive jurisdiction of the courts in [Your Country/State] for any disputes arising from these Terms."
              },
              {
                title: "14. Contact Information",
                content: "If you have any questions about these Terms, please contact us at earningedge00@gmail.com."
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
                {section.list && (
                  <ul className="list-disc list-inside text-gray-700 mb-4 pl-4">
                    {section.list.map((item, lIndex) => (
                      <li key={lIndex}>{item}</li>
                    ))}
                  </ul>
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

export default TermsAndConditions;