import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import usePostData from "../../../hooks/usePost";
import { IUser } from "../../../types/data";
import Beam from "../../../components/aceternity/Beam";

const UserSignup: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { data, loading, error, postData } = usePostData<
    { email: string },
    {
      message: string;
      success: boolean;
      userId?: string;
      email?: string;
      status: string;
      data: IUser;
    }
  >("/user/addEmail");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await postData({ email });
    }
  };

  useEffect(() => {
    console.log(data);
    if (data?.status === "success") {
      if (data.data._id && data.data.email) {
        localStorage.setItem("userId", data.data._id);
        localStorage.setItem("userEmail", data.data.email);
        if (data.data.isEmailVerified) {
          navigate("/add-phno");
        } else navigate("/confirm-email");
      }
    } else if (data) {
      message.error(data.message || "Signup failed");
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
          <h1 className="text-5xl font-thin">
            Create an
            <br /> <p className="font-normal">Account</p>
          </h1>
          <form className="w-full" onSubmit={handleSubmit}>
            <input
              type="email"
              className="p-3 bg-black text-white text-xl border-[0.5px] border-white rounded-md w-full focus:outline-none"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="mt-3 text-xl rounded-md bg-white text-black p-3 w-full"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
            {/* <button
              type="submit"
              className="mt-3 text-xl rounded-md bg-black border border-white text-white p-3 w-full"
              disabled={loading}
            >
              Cancel
            </button> */}
          </form>
        </div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
    </div>
  );
};

export default UserSignup;
