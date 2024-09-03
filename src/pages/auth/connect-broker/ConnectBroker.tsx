import React, { useState } from 'react';
import usePostData from '../../../hooks/usePost';
import CustomLayout from '../../../components/layout/custom-layout/CustomLayout';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

interface ConnectResponse {
  status: string;
  message: string;
}

const ConnectBroker: React.FC = () => {
  const [clientId, setClientId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const { loading, error, postData,data } = usePostData<{ clientId: string; accessToken: string }, ConnectResponse>('/broker/connect');
  const navigate = useNavigate();
  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    await postData({ clientId, accessToken });
    if(data?.status==="success"){
      message.success("Connected!");
      navigate("/")
    }else{
      message.error("Failed to connect, please try again")
    }
  };

  return (
    <CustomLayout>

    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold mr-3">
            <img src='https://pbs.twimg.com/profile_images/1610246738413248512/0Om-vhfG_400x400.jpg'></img>
          </div>
          <h2 className="text-2xl font-semibold">Connect to Broker</h2>
        </div>
        <form onSubmit={handleConnect}>
          <div className="mb-4">
            <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-1">
              Client ID
            </label>
            <input
              type="text"
              id="clientId"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your ClientID"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              required
              />
          </div>
          <div className="mb-6">
            <label htmlFor="accessToken" className="block text-sm font-medium text-gray-700 mb-1">
              Access Token
            </label>
            <input
              type="text"
              id="accessToken"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Paste your Access token here"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              required
              />
            <a href="#" className="text-sm text-green-600 hover:underline mt-1 inline-block">
              Get access token
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            disabled={loading}
            >
            {loading ? 'Connecting...' : 'Connect'}
          </button>
        </form>
        {error && (
          <p className="mt-4 text-red-500 text-sm">{error.message}</p>
        )}
        <p className="mt-8 text-center text-sm text-gray-500">
          © 2024 ALL RIGHTS RESERVED
        </p>
      </div>
    </div>
        </CustomLayout>
  );
};

export default ConnectBroker;