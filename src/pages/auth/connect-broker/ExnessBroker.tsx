import React, { useState } from "react";
import { message } from "antd";
import { NavigateFunction } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { useNavigate } from "react-router-dom";


interface ExnessBrokerProps {
  navigate: NavigateFunction;
}

interface ConnectResponse {
  status?: string;
  message?: string;
}

interface ExnessAccount {
  login: string;
  password: string;
  server: string;
}

const ExnessBroker: React.FC<ExnessBrokerProps> = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [server, setServer] = useState("Exness-MT5Tr4");

  const api = useAxios();
  const navigateRoute = useNavigate();
  const FOREX_SERVER_URL = import.meta.env.VITE_FOREX_SERVER_URL;

  const {
    mutateAsync: connectExnessBroker,
    isPending,
    error,
  } = useMutation<ConnectResponse, Error, ExnessAccount>({
    mutationKey: ["connectExnessBroker"],
    mutationFn: async (accountData) => {
      console.log('accountData', accountData);
      const response = await api.post(
        `${FOREX_SERVER_URL}/add-account`,
        accountData
      );

      return response.data;
    },
    onSuccess: async (data) => {
      console.log(data);
      await api.post(`/broker/brokerToggleConnection`, { connected: true });


      message.success("Connected to Exness!");

      navigateRoute("/home2");
    },
    onError: async (error) => {
      console.log(error);
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

  return (
    <div className="bg-darkBg border border-darkStroke rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-blue-900/30 hover:shadow-2xl hover:-translate-y-1">
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

          <div className="pt-2">
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

export default ExnessBroker;