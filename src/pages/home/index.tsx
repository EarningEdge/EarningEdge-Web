import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import moment from "moment";
import CustomLayout from "../../components/layout/custom-layout/CustomLayout";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import AdminAlert from "./AdminAlert";
import ContactUs from "./ContactUs";
import TopNews from "./TopNews";
import ConnectBroker from "./ConnectBroker";
// import RedirectToPayment from "./RedirectToPayment";
import { login } from "../../redux/slices/authSlice";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

const Index: React.FC = () => {
  const {token,user} = useAppSelector((state)=>state.auth)
  if (!user) return <Navigate to="/auth" />;
  const api = useAxios()
  const daysSinceCreation = moment().diff(moment(user?.createdAt), 'days');
  const freeTrialDaysLeft = 30 - daysSinceCreation;
  const {data:userData} =useQuery({
    queryKey:["user",user._id],
    queryFn:async()=>{
      return await api.get("/user/details/"+user._id);
    }
  })
  const dispatch = useAppDispatch()
  useEffect(()=>{
    if(userData){
      dispatch(login({
        token,user:userData?.data?.data?.userData
      }))
      }
  },[userData])

  return (
    <CustomLayout>  
      <div className="flex justify-start items-center space-x-1">
        <h1 className="text-slate-500">
          {freeTrialDaysLeft <= 0 ? (
            <span className="text-red-400 ml-1">
              Free trial expired {freeTrialDaysLeft * -1} days ago
            </span>
          ) : (
            `Free trial expires in ${freeTrialDaysLeft} days`
          )}
        </h1>
        {/* <RedirectToPayment /> */}
      </div>
      <AdminAlert />
      <ConnectBroker user={user} />
      <ContactUs firstName={user?.firstName || ""} />
      <div className="my-4">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/508c10J-ipc?si=HNVSkSca_tWQ38jL" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
      <TopNews />
    </CustomLayout>
  );
};

export default Index;