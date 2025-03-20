import React, { useState } from "react";
import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

interface DhanBrokerProps {
  onHelpClick: () => void;
  navigate: NavigateFunction;
}

interface ConnectResponse {
  status: string;
  message: string;
}

const DhanBroker: React.FC<DhanBrokerProps> = ({ onHelpClick, navigate }) => {
  const [clientId, setClientId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const api = useAxios();

  const {
    mutateAsync: connectDhanBroker,
    isPending,
    error,
  } = useMutation<
    ConnectResponse,
    Error,
    { clientId: string; accessToken: string }
  >({
    mutationKey: ["connectDhanBroker"],
    mutationFn: async ({ clientId, accessToken }) => {
      const response = await api.post("/broker/connect", {
        clientId,
        accessToken,
      });
      return response.data;
    },
    onSuccess: async (data) => {
      if (data.status === "success") {
        message.success("Connected to Dhan!");
        await api.post(`/broker/brokerToggleConnection`, { connected: true });
        navigate("/");
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

  return (
    <div className="bg-darkBg border border-darkStroke rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-emerald-900/30 hover:shadow-2xl hover:-translate-y-1">
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
              onClick={onHelpClick}
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
  );
};

export default DhanBroker;