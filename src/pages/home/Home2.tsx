import React, { useEffect } from "react";
import ConnectionStatus from "./ConnectionStatus";
import { login } from "../../redux/slices/authSlice";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import moment from "moment";
import { Navigate } from "react-router-dom";
import ContactUs from "./ContactUs";
import TopNews from "./TopNews";
import CustomLayout from "../../components/layout/custom-layout/CustomLayout";

const Home2: React.FC = () => {
  const { token, user } = useAppSelector((state) => state.auth);
  if (!user) return <Navigate to="/auth" />;
  const api = useAxios();
  const daysSinceCreation = moment().diff(moment(user?.createdAt), "days");
  const freeTrialDaysLeft = 30 - daysSinceCreation;
  const { data: userData } = useQuery({
    queryKey: ["user", user._id],
    queryFn: async () => {
      return await api.get("/user/details/" + user._id);
    },
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userData) {
      dispatch(
        login({
          token,
          user: userData?.data?.data?.userData,
        })
      );
    }
  }, [userData]);

  return (
    <div>
      <CustomLayout>
        <div className="flex justify-start items-center space-x-2 mb-4">
          <h1 className="text-slate-500">
            {freeTrialDaysLeft <= 0 ? (
              <span className="text-red-400 ml-1">
                Free trial expired {freeTrialDaysLeft * -1} days ago
              </span>
            ) : (
              `Free trial expires in ${freeTrialDaysLeft} days`
            )}
          </h1>
        </div>

        <div className="min-h-screen bg-darkBg text-white p-6 space-y-8">
          {/* Top Section */}
          <div className="flex gap-4">
            {/* Connected Status Card (Left Half) */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg w-1/2">
              <ConnectionStatus />
            </div>

            {/* Profit/Loss Graph (Right Half) */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg w-1/2">
              <p>Graph</p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Today's Trade</h2>
            <h1>Table</h1>
          </div>
        </div>

        <div className="my-8">
          <ContactUs firstName={user?.firstName || ""} />
        </div>

        <div className="my-4">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/508c10J-ipc?si=HNVSkSca_tWQ38jL"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        <TopNews />
      </CustomLayout>
    </div>
  );
};

export default Home2;
