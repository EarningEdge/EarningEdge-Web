import React, { useState } from "react";
import { Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";
import DhanBroker from "./DhanBroker";
import ExnessBroker from "./ExnessBroker";

const ConnectBroker: React.FC = () => {
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [accountInfoModalOpen, setAccountInfoModalOpen] = useState(false);
  const [hasAccount, setHasAccount] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const handleHelpClick = () => {
    setHelpModalOpen(true);
  };

  const handleAccountChoice = (hasExistingAccount: boolean) => {
    setHasAccount(hasExistingAccount);
    setHelpModalOpen(false);
    setAccountInfoModalOpen(true);
  };

  return (
    <div className="bg-gradient-to-b from-darkBg to-darkBg/95 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">
            Connect Your Trading Accounts
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Link your brokers to access all trading features and automated strategies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dhan Broker Column */}
          <DhanBroker
            onHelpClick={handleHelpClick}
            navigate={navigate}
          />

          {/* Exness Broker Column */}
          <ExnessBroker navigate={navigate} />
        </div>
      </div>

      {/* Help Modal */}
      <Modal
        open={helpModalOpen}
        onCancel={() => setHelpModalOpen(false)}
        footer={null}
        title={
          <div className="flex items-center gap-2">
            <span className="text-green-500">❓</span>
            <span>Dhan Account Assistance</span>
          </div>
        }
        className="custom-modal"
      >
        <div className="flex justify-center items-center flex-col py-6">
          <h2 className="mb-6 text-lg font-semibold">
            Do you have an account on Dhan broker?
          </h2>
          <div className="space-y-4 w-full">
            <Button
              onClick={() => handleAccountChoice(true)}
              className="w-full h-auto py-3 bg-green-600 hover:bg-green-700 text-white border-green-700 shadow-lg shadow-green-700/30 transition-all duration-300"
              type="primary"
              size="large"
            >
              Yes, I already have an account
            </Button>
            <Button
              onClick={() => handleAccountChoice(false)}
              className="w-full h-auto py-3 bg-blue-600 hover:bg-blue-700 text-white border-blue-700 shadow-lg shadow-blue-700/30 transition-all duration-300"
              type="primary"
              size="large"
            >
              No, I don't have an account
            </Button>
          </div>
        </div>
      </Modal>

      {/* Account Info Modal */}
      <Modal
        open={accountInfoModalOpen}
        onCancel={() => setAccountInfoModalOpen(false)}
        footer={null}
        title={
          <div className="flex items-center gap-2">
            {hasAccount ? (
              <>
                <span className="text-green-500">✓</span>
                <span>Existing Account Instructions</span>
              </>
            ) : (
              <>
                <span className="text-blue-500">🔄</span>
                <span>New Account Instructions</span>
              </>
            )}
          </div>
        }
        width={700}
        className="custom-modal"
      >
        <div className="py-4">
          {hasAccount === true ? (
            <>
              <div className="mb-8">
                <div className="rounded-lg overflow-hidden shadow-xl shadow-green-900/20">
                  <iframe
                    className="w-full aspect-video"
                    src="https://www.youtube.com/embed/rAGkne08UXM?si=XFaCz6NqG7dFXuy2"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="text-lg font-medium mt-4 mb-2">
                  Please follow the instructions in the video above
                </p>
              </div>

              <div className="bg-gray-800/70 p-6 rounded-lg border border-gray-700 shadow-lg">
                <h3 className="font-semibold text-lg mb-4 text-green-400">Step-by-step guide:</h3>
                <ol className="list-decimal pl-5 space-y-3">
                  <li className="text-base">Log in to your Dhan account</li>
                  <li className="text-base">Navigate to the API section in your account settings</li>
                  <li className="text-base">Generate your Client ID and Access Token</li>
                  <li className="text-base">Copy and paste them into the respective fields on this page</li>
                  <li className="text-base">Click "Connect to Dhan" to complete the integration</li>
                </ol>
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  onClick={() => setAccountInfoModalOpen(false)}
                  type="primary"
                  className="bg-green-600 hover:bg-green-700 h-10 px-6 shadow-lg shadow-green-700/20"
                >
                  Got it, thanks!
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4 text-blue-400">Create your Dhan account:</h3>
                <ol className="list-decimal pl-5 space-y-3">
                  <li className="text-base">
                    Click here 👉{" "}
                    <a
                      className="text-blue-500 underline font-semibold hover:text-blue-400 transition-colors"
                      target="_blank"
                      href="https://join.dhan.co/?invite=VPNEZ74787"
                      rel="noopener noreferrer"
                    >
                      Visit Dhan
                    </a>{" "}
                    to begin the registration process
                  </li>
                  <li className="text-base">Click on "Start trading on dhan"</li>
                  <li className="text-base">Complete the account creation process</li>
                  <li className="text-base">Follow the verification steps as required</li>
                  <li className="text-base">
                    Once your account is approved, return to this page and click "Need Help?" again
                  </li>
                </ol>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-800/30 shadow-lg">
                <div className="flex items-start">
                  <div className="text-blue-400 mr-3 text-xl">ℹ️</div>
                  <p>
                    Account approval typically takes 1-2 business days. After your account is approved,
                    you'll need to generate API credentials to connect with our platform.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  onClick={() => setAccountInfoModalOpen(false)}
                  type="primary"
                  className="bg-blue-600 hover:bg-blue-700 h-10 px-6 shadow-lg shadow-blue-700/20"
                >
                  I'll create my account
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ConnectBroker;