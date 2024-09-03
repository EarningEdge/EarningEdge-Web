import { useState } from "react";
import usePostData from "../../../hooks/usePost";
import { useNavigate } from "react-router-dom";

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
      alert("Please enter your email.");
      return;
    }
    await sendOtp({ email });
    if (sendOtpError) {
      alert(sendOtpError.message);
      return;
    }
    alert("OTP sent successfully.");
    setStep(2);
  };

  const handleResetPassword = async () => {
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }
    if (!password || !confirmPassword) {
      alert("Please enter and confirm your password.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    await resetPassword({ email, otp, password });
    if (resetPasswordError) {
      alert(resetPasswordError.message);
      return;
    }
    alert("Password reset successfully. Please log in with your new password.");
    navigate("/login")
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-end p-5">
      <div className="flex flex-col text-white gap-3 mb-10 w-full">
        <h1 className="text-5xl">
          Forgot Password <br /> <b>Earning Edge</b>
        </h1>

        {step === 1 && (
          <>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="p-3 bg-black text-white text-xl border-2 border-white rounded-md w-full"
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
              className="p-3 bg-black text-white text-xl border-2 border-white rounded-md w-full"
              placeholder="Enter OTP"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="p-3 bg-black text-white text-xl border-2 border-white rounded-md w-full"
              placeholder="New Password"
            />
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="p-3 bg-black text-white text-xl border-2 border-white rounded-md w-full"
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
    </div>
  );
};

export default ForgotPassword;
