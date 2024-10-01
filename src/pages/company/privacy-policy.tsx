import CustomLayout from "../../components/layout/custom-layout/CustomLayout";

const PrivacyPolicy = () => {
  return (
    <CustomLayout>

    <div className="bg-darkBg min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <p className="text-gray-700 mb-4">
            This privacy policy applies to the <strong>EarningEdge web app</strong> (hereafter referred to as "Web Application"). The Web Application is created by EarningEdge (hereafter referred to as "Service Provider") as a Freemium service. This service is intended for use "AS IS."
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Information Collection and Use</h2>
          <p className="text-gray-700 mb-4">
            The Web Application collects information when you access and use it. This information may include:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 pl-4">
            <li>Your device's Internet Protocol address (IP address)</li>
            <li>Browser type and version</li>
            <li>The pages of the Web Application you visit, the time and date of your visit, and the time spent on those pages</li>
            <li>The operating system you use on your device</li>
            <li>Usage statistics, such as session duration and user interactions</li>
          </ul>
          <p className="text-gray-700 mb-4">
            The <strong>Dhan Broker's access tokens and keys</strong> may also be collected when you connect your broker account. This sensitive financial data is encrypted using <strong>AES encryption</strong>, and the encryption keys are securely stored in environment variables on our backend servers.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Third-Party Access</h2>
          <p className="text-gray-700 mb-4">
            The Service Provider may share aggregated, anonymized data with third-party services to improve the Web Application. Sensitive financial information, such as <strong>Dhan Broker's access tokens and keys</strong>, is <strong>never</strong> shared with third parties.
          </p>
          {/* <p className="text-gray-700 mb-4">
            The Web Application utilizes third-party services, each having their own Privacy Policies. Links to these Privacy Policies are provided below:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 pl-4">

            <li><a>
                </a> Razorpay</li>
          </ul> */}

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Security</h2>
          <p className="text-gray-700 mb-4">
            The Service Provider is committed to safeguarding your information. Security measures for the Web Application include:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4 pl-4">
            <li><strong>AES Encryption</strong> for sensitive financial data, including <strong>Dhan Broker's access tokens and keys</strong></li>
            <li>Secure storage of encryption keys in environment variables on backend servers hosted on <strong>Vercel</strong></li>
            <li>Data transmission secured with <strong>HTTPS</strong></li>
          </ul>
          <p className="text-gray-700 mb-4">
            While we strive to protect your information, no method of electronic transmission or storage is 100% secure.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Data Retention Policy</h2>
          <p className="text-gray-700 mb-4">
            The Service Provider retains User-Provided data for as long as you use the Web Application and for a reasonable time thereafter. If you wish to delete User-Provided data, please contact us at <strong>earningedge00@gmail.com</strong>.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Opt-Out Rights</h2>
          <p className="text-gray-700 mb-4">
            You can stop all collection of information by discontinuing use of the Web Application.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Children</h2>
          <p className="text-gray-700 mb-4">
            The Web Application does not knowingly collect personal information from children under the age of 13. If we become aware that a child under 13 has provided personal information, we will immediately delete it from our servers. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at <strong>earningedge00@gmail.com</strong>.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Changes to this Privacy Policy</h2>
          <p className="text-gray-700 mb-4">
            This Privacy Policy may be updated periodically. Continued use of the Web Application implies consent to the updated Privacy Policy.
          </p>
          <p className="text-gray-700 mb-4">
            This privacy policy is effective as of <strong>2024-09-27</strong>.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Your Consent</h2>
          <p className="text-gray-700 mb-4">
            By using the Web Application, you consent to the collection and use of your data as described in this Privacy Policy.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            For questions regarding privacy while using the Web Application, please contact us at <strong>earningedge00@gmail.com</strong>.
          </p>
        </div>
      </div>
    </div>
            
    </CustomLayout>
  );
};

export default PrivacyPolicy;