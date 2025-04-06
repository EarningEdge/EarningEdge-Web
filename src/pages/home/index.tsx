import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import CustomLayout from "../../components/layout/custom-layout/CustomLayout";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { login } from "../../redux/slices/authSlice";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import ExnessBroker from "../auth/connect-broker/ExnessBroker";

const Index: React.FC = () => {
  const { token, user } = useAppSelector((state) => state.auth);
  const [connectionData, setConnectionData] = useState<{
    login: string;
    password: string;
    server: string;
    name: string;
    createdAt: string;
    _id: string;
  } | null>(null);
  if (!user) return <Navigate to="/auth" />;

  const api = useAxios();
  const { data: userData } = useQuery({
    queryKey: ["user", user._id],
    queryFn: async () => {
      return await api.get("/user/details/" + user._id);
    },
  });
  const dispatch = useAppDispatch();
  const fetchConnectionData = async () => {
    const response = await api.get("/mt5Connection/user/" + user._id);
    console.log(response.data);
    setConnectionData(response.data);
  };
  useEffect(() => {
    fetchConnectionData();
    if (userData) {
      dispatch(
        login({
          token,
          user: userData?.data?.data?.userData,
        })
      );
    }
  }, [userData]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <CustomLayout>
      <div className="flex flex-col gap-8 min-h-screen p-6 dark">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-white mb-3">
            Hello{" "}
            <span className="text-blue-400">
              {user?.firstName?.toUpperCase()}
            </span>
            !
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Welcome to EarningEdge. We are a team of experienced traders who are
            dedicated to helping you achieve your financial goals.
          </p>
        </div>

        {connectionData ? (
          <div className="bg-gray-800/60 rounded-xl p-6 shadow-lg max-w-4xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Connection Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Account Name</p>
                  <p className="text-white text-lg font-medium">
                    {connectionData.name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Login ID</p>
                  <p className="text-white text-lg font-medium">
                    {connectionData.login}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Server</p>
                  <p className="text-white text-lg font-medium">
                    {connectionData.server}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Created On</p>
                  <p className="text-white text-lg font-medium">
                    {formatDate(connectionData.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800/60 rounded-xl p-6 shadow-lg max-w-4xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              No Connection Found
            </h2>
            <p className="text-gray-300 mb-6">
              Please connect your broker account to continue
            </p>
            <ExnessBroker />
          </div>
        )}
      </div>
    </CustomLayout>
  );
};

export default Index;
