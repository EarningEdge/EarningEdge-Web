import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { IUser } from "../../types/data";
import { useNavigate } from "react-router-dom";

const ConnectBroker = ({ user }: { user: IUser }) => {
  const navigate = useNavigate();
  return (
    <div>
      {user?.isBrokerConnected ? (
        <div className="bg-green-300 px-3 w-full h-10 flex items-center justify-center space-x-3  border-[0.7px] border-green-800 rounded-md">
          <CheckCircleOutlined className=" text-2xl text-green-800" />
          <h1>Broker connected! 🎉</h1>
        </div>
      ) : (
        <div
          onClick={() => {
            navigate("/connectbroker");
          }}
          className=" px-3 w-full h-10 flex items-center justify-center space-x-3  border-[0.7px] border-orange-800 rounded-md cursor-pointer"
        >
          <ExclamationCircleOutlined className=" text-2xl text-red-300" />
          <h1 className="text-red-300">Broker not connected</h1>
        </div>
      )}
    </div>
  );
};

export default ConnectBroker;
