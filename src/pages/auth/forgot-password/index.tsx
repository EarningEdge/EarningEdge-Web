import { useState } from "react";
import usePostData from "../../../hooks/usePost";
import { useNavigate } from "react-router-dom";
import Beam from "@/components/aceternity/Beam";
import { notify } from "@/utils/notify";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { postData: sendOtp, error: sendOtpError } = usePostData("/user/forgot-password");
  const { postData: resetPassword, error: resetPasswordError } = usePostData("/user/reset-password");
    const navigate = useNavigate()
  const handleSendOtp = async () => {
    if (!email) {
      notify("Please enter your email.", "error");
      return;
    }
    await sendOtp({ email });
    if (sendOtpError) {
      notify(sendOtpError.message, "error");
      return;
    }
    notify("OTP sent successfully.","success");
    setStep(2);
  };

  const handleResetPassword = async () => {
    if (!otp) {
      notify("Please enter the OTP.", "error");
      return;
    }
    if (!password || !confirmPassword) {
      notify("Please enter and confirm your password.", "error");
      return;
    }
    if (password !== confirmPassword) {
      notify("Passwords do not match.", "error");
      return;
    }
    await resetPassword({ email, otp, password });
    if (resetPasswordError) {
      notify(resetPasswordError.message, "error");
      return;
    }
    notify("Password reset successfully. Please log in with your new password.","success");
    navigate("/login")
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-end p-5 auth relative">
  <div className="h-[90vh] w-full dark:bg-black bg-black dark:bg-dot-white/[0.2] bg-dot-white/[0.2] relative flex items-end justify-center">
    <div className="absolute top-0">
      <div className="flex flex-col w-fit mx-auto p-3 items-center relative">
        <Beam className="top-0 left-0" />
        <Beam className="top-0 right-0" />
        <Beam className="bottom-0 left-0" />
        <Beam className="bottom-0 right-0" />
        <img
          className="rounded-full mix-blend-lighten top-0 w-72"
          src="/logo.png"
          alt="Logo"
        />
      </div>
    </div>
    <div className="flex flex-col text-white gap-3 mb-10 z-10 w-full md:w-[30%]">
      <h1 className="text-3xl font-thin">
        Forgot Password <br /> <b>Earning Edge</b>
      </h1>
      {step === 1 && (
        <>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="p-3 bg-black text-white text-xl border-[0.5px] border-white rounded-md w-full"
            placeholder="Enter your email"
          />
          <button
            className="text-xl rounded-md font-semibold bg-white text-black p-3"
            onClick={handleSendOtp}
          >
            Send OTP
          </button>
        </>
      )}
      {step === 2 && (
        <>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            className="p-3 bg-black text-white text-xl border-[0.5px] border-white rounded-md w-full"
            placeholder="Enter OTP"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="p-3 bg-black text-white text-xl border-[0.5px] border-white rounded-md w-full"
            placeholder="New Password"
          />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            className="p-3 bg-black text-white text-xl border-[0.5px] border-white rounded-md w-full"
            placeholder="Confirm Password"
          />
          <button
            className="text-xl rounded-md font-semibold bg-white text-black p-3"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>
        </>
      )}
    </div>
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
  </div>
</div>

  );
};

export default ForgotPassword;
