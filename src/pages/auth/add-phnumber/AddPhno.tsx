import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import usePostData from "../../../hooks/usePut";
import Beam from "../../../components/aceternity/Beam";
import { cancelSignUp } from "../../../utils/api";
import { notify } from "../../../utils/notify";
const AddPhno: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const [isCancelling,setIsCancelling] = useState(false);
  const { data, loading, error, postData } = usePostData<
    { phoneNumber: string; userId: string },
    {
      message: string;
      status: string;
    }
  >("/user/addPhoneNumber");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (phoneNumber && userId) {
      await postData({ phoneNumber: "+91" + phoneNumber, userId });
    }
  };

  useEffect(() => {
    if(!localStorage.getItem("userEmail")){
      return navigate("/signup");
    }
    if(localStorage.getItem("userPhoneNumber")){
      return navigate("/confirm-phno");
    }
    if (data?.status === "success") {
      localStorage.setItem("userPhoneNumber", phoneNumber);
      navigate("/confirm-phno");
    } else if (error) {
      message.error(error.message || "Failed to add phone number");
    }
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
        notify("Process canceled","success")
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
          <h1 className="text-5xl">
            Create an
            <br /> <b>Account</b>
          </h1>
          <p>Phone number</p>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <input
                type="text"
                value="+91"
                className="p-3 bg-black text-white text-xl border-[0.5px] focus:outline-none border-white rounded-md w-16"
                readOnly
              />
              <input
                type="tel"
                className="p-3 bg-black text-white text-xl border-[0.5px] focus:outline-none border-white rounded-md w-full"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="mt-3 text-xl rounded-md font-semibold bg-white text-black p-3 w-full"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Next"}
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

export default AddPhno;
