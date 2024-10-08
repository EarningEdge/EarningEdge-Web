import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import usePostData from "../../../hooks/usePut";
import { IUser } from "../../../types/data";
import Beam from "../../../components/aceternity/Beam";
import { cancelSignUp } from "../../../utils/api";
import { notify } from "../../../utils/notify";
import { useSignupFlow } from "../../../hooks/useUserFlowManager";

const ConfirmMail: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{navigate("/")},[])
  const [isCancelling,setIsCancelling] = useState(false);
  const {validateCurrentStep,getState} = useSignupFlow();
  const { data, loading, error, postData } = usePostData<
    { otp: string; email: string },
    {
      status: string;
      data?: IUser;
    }
  >("/user/verifyEmail");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp && email) {
      await postData({ otp, email });
    }
  };

  useEffect(() => {
    validateCurrentStep()
    const email = getState().email
    if(!email){
      alert("Email not found")
      return;
    }
    setEmail(email)
    // if (data?.status === "success") {
    //   updateState({
    //     emailVerified: true,
    //   });
    //   navigate("/add-phno");
    // } else if (error) {
    //   updateState({
    //     emailVerified: false,
    //   });
    //   message.error(error.message || "Verification failed");
    // }
  }, [data, navigate]);
  
  useEffect(() => {
    if (error) {
      message.error(
        //@ts-ignore
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  }, [error]);
  
  const handleCancel = async()=>{
    try {
      setIsCancelling(true);
      const userId = localStorage.getItem("userId");
      if(!userId){
        notify("UserId not found","error")
        return
      }
      const res = await cancelSignUp(userId+"")
      if(res?.status===202){
        notify("Process terminated!","success")
        localStorage.clear();
        navigate("/")
      }
    } catch (error) {
      notify("Failed to cancel the process","error");
    }
    finally{
      setIsCancelling(false);
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen flex items-end p-5 auth relative">
      <div className=" h-[90vh] w-full dark:bg-black bg-black  dark:bg-dot-white/[0.2] bg-dot-white/[0.2] relative flex items-end justify-center">
        <div className="absolute top-0">
          <div className="flex  flex-col w-fit mx-auto p-3 items-center relative ">
            <Beam className="top-0 left-0" />
            <Beam className="top-0 right-0" />
            <Beam className="bottom-0 left-0" />
            <Beam className="bottom-0 right-0" />
            <img
              className=" rounded-full mix-blend-lighten top-0 w-72"
              src="/logo.png"
            />
          </div>
        </div>
        <div className="flex flex-col text-white gap-3 mb-10 z-10 w-full md:w-[30%] ">
          <h1 className="text-5xl text-thin">
            Create an
            <br /> <b>Account</b>
          </h1>
          <p>OTP sent to {email||"your email address"}</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="p-3 bg-black text-white text-xl border-[0.5px] border-white rounded-md w-full focus:outline-none"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button
              type="submit"
              className="mt-3 text-xl rounded-md bg-white text-black p-3 w-full"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Next"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="mt-3 text-xl rounded-md bg-black text-white p-3 w-full"
              disabled={isCancelling}
            >
              {isCancelling ? "Cancelling..." : "Cancel"}
            </button>
          </form>
        </div>
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
    </div>
  );
};

export default ConfirmMail;
