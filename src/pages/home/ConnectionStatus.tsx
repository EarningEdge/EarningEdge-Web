import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/redux/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useDispatch } from "react-redux";
import { updateuser } from "@/redux/slices/authSlice";

const ConnectionStatus: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  if (!user) return <Navigate to="/auth" />;

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showBrokerSelection, setShowBrokerSelection] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const api = useAxios();
  const dispatch = useDispatch();

  const isBrokerConnected = user?.isBrokerConnected;

  const handleClick = () => {
    if (!isBrokerConnected) {
      setShowBrokerSelection(true);
    } else {
      setShowModal(true);
    }
  };

  const handleBrokerSelect = (broker: 'dhan' | 'exness') => {
    setShowBrokerSelection(false);
    navigate(`/connect-${broker}`);
  };

  const handleDisconnect = async () => {
    try {
      setIsDisconnecting(true);
      await api.post('/broker/disconnect');
      dispatch(updateuser({
        ...user!,
        isBrokerConnected: false
      }));
      setShowModal(false);
      setIsDisconnecting(false);
    } catch (error) {
      console.error("Failed to disconnect broker:", error);
      setIsDisconnecting(false);
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex h-full items-center justify-center">
      {/* Connection Status Icon */}
      <div className="relative flex flex-col items-center">
        <div onClick={handleClick}>
          <svg
            viewBox="0 0 100 100"
            className={`w-32 h-32 cursor-pointer transition-transform duration-300 ${isBrokerConnected ? "scale-110" : "scale-100"}`}
            style={{
              filter: isBrokerConnected
                ? "drop-shadow(0 0 40px #22c55e)"
                : "drop-shadow(0 0 10px #4b5563)",
            }}
          >
            <defs>
              <linearGradient
                id="ringGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor={isBrokerConnected ? "#22c55e" : "#4b5563"}
                />
                <stop
                  offset="100%"
                  stopColor={isBrokerConnected ? "#22c55e" : "#4b5563"}
                />
              </linearGradient>
            </defs>
            <path
              d="M20 35 A 35 35 0 1 0 80 35"
              stroke="url(#ringGradient)"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M50 15 L50 55"
              stroke="#ffffff"
              strokeWidth="12"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        <h1 className="mt-6 text-2xl font-semibold text-white">
          {isBrokerConnected && user?.broker_name
            ? `Connected to ${user.broker_name}`
            : `Not Connected to ${user?.broker_name || 'Broker'}`}
        </h1>
        <p className="mt-2 text-lg text-gray-300">
          {isBrokerConnected
            ? "Click the button to disconnect"
            : "Click the button to connect"}
        </p>
        <p className="mt-2 text-base text-gray-400">
          {user?.brokerLastConnectedAt
            ? `Connected at ${formatDate(user?.brokerLastConnectedAt)}`
            : "Broker Never Connected"}
        </p>
      </div>

      {/* Broker Selection Modal */}
      <AnimatePresence>
        {showBrokerSelection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-gray-800 rounded-2xl p-8 shadow-2xl max-w-xl w-full mx-4"
            >
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Choose Your Broker
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {/* Dhan Broker Option */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBrokerSelect('dhan')}
                  className="bg-green-900/20 border border-green-700/30 rounded-xl p-6 text-center cursor-pointer hover:bg-green-900/40 transition-colors"
                >
                  <img
                    src="https://pbs.twimg.com/profile_images/1610246738413248512/0Om-vhfG_400x400.jpg"
                    alt="Dhan Logo"
                    className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-green-500/50"
                  />
                  <h3 className="text-xl font-semibold text-white mb-2">Dhan</h3>
                  <p className="text-green-400">Indian Stock Market</p>
                </motion.div>

                {/* Exness Broker Option */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBrokerSelect('exness')}
                  className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-6 text-center cursor-pointer hover:bg-blue-900/40 transition-colors"
                >
                  <img
                    src="https://d33vw3iu5hs0zi.cloudfront.net/media/icon_512x512_3eb931d3e5.png"
                    alt="Exness Logo"
                    className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-blue-500/50"
                  />
                  <h3 className="text-xl font-semibold text-white mb-2">Exness</h3>
                  <p className="text-blue-400">Forex & Commodities</p>
                </motion.div>
              </div>
              <div className="mt-6 text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowBrokerSelection(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Disconnect Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-gray-800 rounded-lg p-6 shadow-xl max-w-md w-full mx-4"
            >
              <h2 className="text-xl font-bold text-white mb-4">Disconnect Broker</h2>
              <p className="text-gray-300 mb-6">
                Are you sure you want to disconnect your broker? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                  disabled={isDisconnecting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDisconnect}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  disabled={isDisconnecting}
                >
                  {isDisconnecting ? "Disconnecting..." : "Disconnect"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConnectionStatus;