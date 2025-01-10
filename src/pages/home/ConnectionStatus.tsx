import { useAppSelector } from "@/redux/hooks";
import { Navigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ConnectBroker from "../auth/connect-broker/ConnectBroker";

const ConnectionStatus: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  if (!user) return <Navigate to="/auth" />;

  const isBrokerConnected = user?.isBrokerConnected;

  // const handleClick = () => {
  //   setIsOn(!isOn);
  // };
    console.log(user)

  return (
    <div className="flex h-full items-center justify-center ">
      <div className="relative flex flex-col items-center">
        <Dialog>
          <DialogTrigger asChild>
            <svg
              // onClick={handleClick}
              viewBox="0 0 100 100"
              className={`w-32 h-32 cursor-pointer transition-transform duration-300 ${
                isBrokerConnected ? "scale-110" : "scale-100"
              }`}
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
          </DialogTrigger>
          <DialogContent className="bg-darkBg text-white">
            <ConnectBroker />
          </DialogContent>
        </Dialog>

        <h1 className="mt-6 text-2xl font-semibold text-white">
          {isBrokerConnected ? "Connected" : "Disconnected"}
        </h1>
        <p className="mt-2 text-lg text-gray-300">
          {isBrokerConnected
            ? "Click the button to disconnect"
            : "Click the button to connect"}
        </p>
        <p className="mt-2 text-base text-gray-400">Connected X days Ago</p>
      </div>
    </div>
  );
};

export default ConnectionStatus;