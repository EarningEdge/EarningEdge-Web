import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { updateuser } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";


const DhanBroker: React.FC = () => {
  const [clientId, setClientId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [accountInfoModalOpen, setAccountInfoModalOpen] = useState(false);
  const [hasAccount, setHasAccount] = useState<boolean | null>(null);
  const api = useAxios();
  const disptach = useDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const {
    mutateAsync: connectDhanBroker,
    isPending,
    error,
  } = useMutation<
    { status: string; message: string },
    Error,
    { clientId: string; accessToken: string }
  >({
    mutationKey: ["connectDhanBroker"],
    mutationFn: async ({ clientId, accessToken }) => {
      disptach(updateuser({
        broker_name: "dhan",
        isBrokerConnected: true,
        brokerLastConnectedAt: new Date()
      }));
      const response = await api.post("/broker/connect", {
        clientId,
        accessToken,
      });

      return response.data;
    },
    onSuccess: async (data) => {
      if (data.status === "success") {
        message.success("Connected to Dhan!");

        disptach(updateuser({
          broker_name: "dhan",
          isBrokerConnected: true,
          brokerLastConnectedAt: new Date()
        }));

        await api.post(`/broker/brokerToggleConnection`, { connected: true });
      } else {
        message.error("Failed to connect to Dhan, please try again");
      }
    },
    onError: () => {
      message.error("Failed to connect to Dhan, please try again");
    },
  });

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await connectDhanBroker({ clientId, accessToken });
    } catch (error) {
      // Error handled in mutation
    }
  };

  const handleHelpClick = () => {
    setHelpModalOpen(true);
  };

  const handleAccountChoice = (hasExistingAccount: boolean) => {
    setHasAccount(hasExistingAccount);
    setHelpModalOpen(false);
    setAccountInfoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-darkBg to-darkBg/95 flex items-center justify-center py-12">
      <div className="w-full max-w-md px-4">
        <div className="bg-darkSecondary border border-darkStroke rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-emerald-900/30 hover:shadow-2xl hover:-translate-y-1">
          <div className="bg-gradient-to-r from-green-900/40 to-darkSecondary p-5 border-b border-darkStroke">
            <div className="flex items-center">
              <div className="w-14 h-14 rounded-full overflow-hidden mr-4 bg-white p-1 shadow-lg">
                <img
                  src="https://pbs.twimg.com/profile_images/1610246738413248512/0Om-vhfG_400x400.jpg"
                  alt="Dhan Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Dhan Broker
                </h2>
                <p className="text-green-400 text-sm">Indian Stock Market</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="px-1">
              <p className="text-gray-300 mb-4">
                Connect your Dhan account to trade Indian stocks and futures
              </p>
            </div>

            <form onSubmit={handleConnect} className="space-y-5">
              <div className="space-y-1">
                <label
                  htmlFor="clientId"
                  className="block text-sm font-medium text-gray-200"
                >
                  Client ID
                </label>
                <input
                  type="text"
                  id="clientId"
                  className="w-full px-4 py-3 border border-darkStroke rounded-lg bg-darkSecondary focus:outline-none focus:ring-2 focus:ring-green-500 text-white transition-all duration-200"
                  placeholder="Enter your Client ID"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="accessToken"
                  className="block text-sm font-medium text-gray-200"
                >
                  Access Token
                </label>
                <input
                  type="text"
                  id="accessToken"
                  className="w-full px-4 py-3 border border-darkStroke text-white rounded-lg bg-darkSecondary focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                  placeholder="Paste your Access Token here"
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-700 to-green-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-green-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center font-medium shadow-lg shadow-green-900/30"
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="flex items-center">
                      <span className="mr-3">Connecting</span>
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span>Connect to Dhan</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  )}
                </button>

                <button
                  onClick={handleHelpClick}
                  type="button"
                  className="w-full text-green-400 bg-darkSecondary border border-green-900/30 rounded-lg py-3 px-4 hover:bg-green-900/20 transition-all duration-300 shadow-md"
                >
                  Need Help?
                </button>
              </div>
            </form>

            {error && (
              <div className="mt-4 text-red-500 text-sm p-3 bg-red-900/20 rounded-lg border border-red-700/30">
                {error.message}
              </div>
            )}
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
    </div>
  );
};

export default DhanBroker;