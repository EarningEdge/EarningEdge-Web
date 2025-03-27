import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { updateuser } from "@/redux/slices/authSlice";

interface ExnessAccount {
  login: string;
  password: string;
  server: string;
}

const ExnessBroker: React.FC = () => {
  const [login, setLogin] = useState("244219048");
  const [password, setPassword] = useState("Test@123");
  const [server, setServer] = useState("Exness-MT5Trial14");
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [accountInfoModalOpen, setAccountInfoModalOpen] = useState(false);
  const [hasAccount, setHasAccount] = useState<boolean | null>(null);

  const api = useAxios();
  const disptach = useDispatch();
  const FOREX_SERVER_URL = import.meta.env.VITE_FOREX_SERVER_URL;
  const { user } = useAppSelector((state) => state.auth);

  const {
    mutateAsync: connectExnessBroker,
    isPending,
    error,
  } = useMutation<{ status?: string; message?: string }, Error, ExnessAccount>({
    mutationKey: ["connectExnessBroker"],
    mutationFn: async (accountData) => {
      console.log("user.broker_name", user?.broker_name);
      disptach(updateuser({
        broker_name: "exness",
        isBrokerConnected: true,
        brokerLastConnectedAt: new Date()
      }));
      const response = await api.post(
        `${FOREX_SERVER_URL}/add-account`,
        accountData
      );

      return response.data;
    },
    onSuccess: async () => {
      await api.post(`/broker/brokerToggleConnection`, { connected: true });

      disptach(updateuser({
        broker_name: "exness",
        isBrokerConnected: true,
        brokerLastConnectedAt: new Date()
      }));

      message.success("Connected to Exness!");
    },
    onError: async (err) => {
      console.error("Error connecting to Exness:", err);
      message.error("Failed to connect to Exness, please try again");
    },
  });

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await connectExnessBroker({ login, password, server });
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
        <div className="bg-darkSecondary border border-darkStroke rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-blue-900/30 hover:shadow-2xl hover:-translate-y-1">
          <div className="bg-gradient-to-r from-blue-900/40 to-darkSecondary p-5 border-b border-darkStroke">
            <div className="flex items-center">
              <div className="w-14 h-14 rounded-full overflow-hidden mr-4 bg-white p-1 shadow-lg flex items-center justify-center">
                <img
                  src="https://d33vw3iu5hs0zi.cloudfront.net/media/icon_512x512_3eb931d3e5.png"
                  alt="Exness Logo"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Exness Broker
                </h2>
                <p className="text-blue-400 text-sm">Forex & Commodities</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="px-1">
              <p className="text-gray-300 mb-4">
                Connect your Exness account to trade Forex, Commodities, and Indices
              </p>
            </div>

            <form onSubmit={handleConnect} className="space-y-5">
              <div className="space-y-1">
                <label
                  htmlFor="login"
                  className="block text-sm font-medium text-gray-200"
                >
                  Login
                </label>
                <input
                  type="text"
                  id="login"
                  className="w-full px-4 py-3 border border-darkStroke rounded-lg bg-darkSecondary focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all duration-200"
                  placeholder="Enter your Login ID"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-200"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 border border-darkStroke text-white rounded-lg bg-darkSecondary focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="server"
                  className="block text-sm font-medium text-gray-200"
                >
                  Server
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="server"
                    className="w-full px-4 py-3 border border-darkStroke text-white rounded-lg bg-darkSecondary focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="Enter your Server"
                    value={server}
                    onChange={(e) => setServer(e.target.value)}
                    required
                  />
                  <div className="absolute right-3 top-3 text-gray-400 text-sm">
                    Default: Exness-MT5Tr4
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-700 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center font-medium shadow-lg shadow-blue-900/30"
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
                      <span>Connect to Exness</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  )}
                </button>

                <button
                  onClick={handleHelpClick}
                  type="button"
                  className="w-full text-blue-400 bg-darkSecondary border border-blue-900/30 rounded-lg py-3 px-4 hover:bg-blue-900/20 transition-all duration-300 shadow-md"
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
              <span className="text-blue-500">❓</span>
              <span>Exness Account Assistance</span>
            </div>
          }
          className="custom-modal"
        >
          <div className="flex justify-center items-center flex-col py-6">
            <h2 className="mb-6 text-lg font-semibold">
              Do you have an account on Exness broker?
            </h2>
            <div className="space-y-4 w-full">
              <Button
                onClick={() => handleAccountChoice(true)}
                className="w-full h-auto py-3 bg-blue-600 hover:bg-blue-700 text-white border-blue-700 shadow-lg shadow-blue-700/30 transition-all duration-300"
                type="primary"
                size="large"
              >
                Yes, I already have an account
              </Button>
              <Button
                onClick={() => handleAccountChoice(false)}
                className="w-full h-auto py-3 bg-green-600 hover:bg-green-700 text-white border-green-700 shadow-lg shadow-green-700/30 transition-all duration-300"
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
                  <span className="text-blue-500">✓</span>
                  <span>Existing Account Instructions</span>
                </>
              ) : (
                <>
                  <span className="text-green-500">🔄</span>
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
                  <div className="rounded-lg overflow-hidden shadow-xl shadow-blue-900/20">
                    <iframe
                      className="w-full aspect-video"
                      src="https://www.youtube.com/embed/example"
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
                  <h3 className="font-semibold text-lg mb-4 text-blue-400">Step-by-step guide:</h3>
                  <ol className="list-decimal pl-5 space-y-3">
                    <li className="text-base">Log in to your Exness account</li>
                    <li className="text-base">Navigate to the API or Connection section</li>
                    <li className="text-base">Generate or find your Login, Password, and Server</li>
                    <li className="text-base">Copy and paste them into the respective fields on this page</li>
                    <li className="text-base">Click "Connect to Exness" to complete the integration</li>
                  </ol>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button
                    onClick={() => setAccountInfoModalOpen(false)}
                    type="primary"
                    className="bg-blue-600 hover:bg-blue-700 h-10 px-6 shadow-lg shadow-blue-700/20"
                  >
                    Got it, thanks!
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="font-semibold text-lg mb-4 text-green-400">Create your Exness account:</h3>
                  <ol className="list-decimal pl-5 space-y-3">
                    <li className="text-base">
                      Click here 👉{" "}
                      <a
                        className="text-green-500 underline font-semibold hover:text-green-400 transition-colors"
                        target="_blank"
                        href="https://www.exness.com/register/"
                        rel="noopener noreferrer"
                      >
                        Visit Exness
                      </a>{" "}
                      to begin the registration process
                    </li>
                    <li className="text-base">Complete the account creation form</li>
                    <li className="text-base">Verify your identity and account</li>
                    <li className="text-base">Fund your account</li>
                    <li className="text-base">
                      Once your account is set up, return to this page and click "Need Help?" again
                    </li>
                  </ol>
                </div>

                <div className="bg-green-900/20 p-6 rounded-lg border border-green-800/30 shadow-lg">
                  <div className="flex items-start">
                    <div className="text-green-400 mr-3 text-xl">ℹ️</div>
                    <p>
                      Account verification typically takes 1-2 business days. After your account is
                      approved, you'll need to generate your login credentials to connect with our platform.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button
                    onClick={() => setAccountInfoModalOpen(false)}
                    type="primary"
                    className="bg-green-600 hover:bg-green-700 h-10 px-6 shadow-lg shadow-green-700/20"
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

export default ExnessBroker;