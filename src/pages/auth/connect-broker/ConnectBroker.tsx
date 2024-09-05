import React, { useState } from "react";
import CustomLayout from "../../../components/layout/custom-layout/CustomLayout";
import { message, Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

interface ConnectResponse {
  status: string;
  message: string;
}

const ConnectBroker: React.FC = () => {
  const [clientId, setClientId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [accountInfoModalOpen, setAccountInfoModalOpen] = useState(false);
  const [hasAccount, setHasAccount] = useState<boolean | null>(null);

  const navigate = useNavigate();
  const api = useAxios();

  const {
    mutateAsync: connectBroker,
    isPending,
    error,
  } = useMutation<ConnectResponse, Error, { clientId: string; accessToken: string }>({
    mutationKey: ["connectBroker"],
    mutationFn: async ({ clientId, accessToken }) => {
      const response = await api.post("/broker/connect", { clientId, accessToken });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.status === "success") {
        message.success("Connected!");
        navigate("/");
      } else {
        message.error("Failed to connect, please try again");
      }
    },
    onError: () => {
      message.error("Failed to connect, please try again");
    },
  });

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await connectBroker({ clientId, accessToken });
    } catch (error) {
      // Handle error if necessary
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
    <CustomLayout>
      <div className="flex justify-center items-center min-h-screen bg-darkBg">
        <div className="bg-darkBg border-[0.4px] border-darkStroke p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold mr-3">
              <img
                src="https://pbs.twimg.com/profile_images/1610246738413248512/0Om-vhfG_400x400.jpg"
                alt="Broker Logo"
              />
            </div>
            <h2 className="text-2xl font-semibold text-white">
              Connect to Broker
            </h2>
          </div>
          <form onSubmit={handleConnect}>
            <div className="mb-4">
              <label
                htmlFor="clientId"
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Client ID
              </label>
              <input
                type="text"
                id="clientId"
                className="w-full px-3 py-2 border border-darkStroke rounded-md bg-darkSecondary focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                placeholder="Enter your ClientID"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="accessToken"
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Access Token
              </label>
              <input
                type="text"
                id="accessToken"
                className="w-full px-3 py-2 border border-darkStroke text-white rounded-md bg-darkSecondary focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Paste your Access token here"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                required
              />
              <button
                onClick={handleHelpClick}
                type="button"
                className="text-green-400 mt-2"
              >
                Need Help?
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              disabled={isPending}
            >
              {isPending ? "Connecting..." : "Connect"}
            </button>
          </form>
          {error && (
            <p className="mt-4 text-red-500 text-sm">{error.message}</p>
          )}
        </div>
      </div>

      {/* Help Modal */}
      <Modal
        open={helpModalOpen}
        onCancel={() => setHelpModalOpen(false)}
        footer={null}
      >
        <div className="flex justify-center items-center flex-col py-10">
          <h2 className="mb-4 text-lg font-semibold">
            Do you have an account on Dhan broker?
          </h2>
          <div className="space-y-4">
            <Button
              onClick={() => handleAccountChoice(true)}
              className="w-full"
            >
              Yes, I already have an account
            </Button>
            <Button
              onClick={() => handleAccountChoice(false)}
              className="w-full"
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
      >
        <div className="flex justify-center items-center flex-col py-10">
          {hasAccount === true ? (
            <>
              <h2 className="mb-4 text-lg font-semibold">
                Existing Account Instructions
              </h2>
              <p>
                Please follow the instructions mentioned in the video below:
              </p>
              <iframe
                className="w-3/4 my-2"
                src="https://www.youtube.com/embed/oNB5rzAbAZo?si=Bf5zqvuU64bTHgLE"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
              {/* Add video or instructions for existing account holders */}
              <div className="mt-4">
                <p>1. Log in to your Dhan account</p>
                <p>2. Navigate to the API section</p>
                <p>3. Generate your Client ID and Access Token</p>
                <p>
                  4. Copy and paste them into the respective fields on this page
                </p>
              </div>
            </>
          ) : (
            <>
              <h2 className="mb-4 text-lg font-semibold">
                New Account Instructions
              </h2>
              <p>
                To create a new account on Dhan broker, please follow these
                steps:
              </p>
              <div className="mt-4">
                <p>1. Click here 👉 <a className=" underline font-semibold " target="_blank" href="https://join.dhan.co/?invite=VPNEZ74787">Visit Dhan</a> </p>
                <p>2. Click on "Start trading on dhan"</p>
                <p>3. Create a new account</p>
                <p>4. Follow the registration process</p>
                <p>
                  5. Once your account is approved, return to this page and
                  click "Need Help?" again
                </p>
              </div>
            </>
          )}
        </div>
      </Modal>
    </CustomLayout>
  );
};

export default ConnectBroker;
