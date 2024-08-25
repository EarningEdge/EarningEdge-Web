import React, { useEffect, useRef, useState } from 'react'

type Props = {}

const ConfirmPhno = (props: Props) => {
    const [OTP, setOTP] = useState(Array(6).fill(""));
    const inputRefs: any = useRef([]);
  
    const handleOTPSubmit = () => {
  
  
      window.location.href = "/user-details";
    };
  
    useEffect(() => {
      // Automatically focus the first input field on mount
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, []);
  
    const handleChange = (value: any, index: any) => {
      const newOTP = [...OTP];
      newOTP[index] = value;
      setOTP(newOTP);
  
      // Automatically focus on the next input if a value is entered
      // if (value && index < 5) {
      //   document.getElementById(`otp-${index + 1}`).focus();
      // }
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    };
  
    const handleKeyDown = (e: any, index: any) => {
      if (e.key === "Backspace") {
        const newOTP = [...OTP];
        newOTP[index] = "";
        setOTP(newOTP);
  
        // Move focus to the previous input field if backspace is pressed and current field is empty
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
      }
    };
  
    return (
      <div className="bg-gray-900 min-h-svh flex items-end p-5">
        <div className="flex flex-col text-white gap-3 mb-10 w-full">
          <h1 className="text-5xl">
            Create an
            <br /> <b>Account</b>
          </h1>
          <p>OTP sent to +91 1234567890</p>
  
          <div style={{ display: "flex", gap: "8px" }}>
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={OTP[index]}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                style={{
                  border: "1px solid white",
                  height: "48px",
                  width: "48px",
                  padding: "12px",
                  backgroundColor: "#0009",
                  color: "white",
                  textAlign: "center",
                  fontSize: "18px",
                }}
              />
            ))}
          </div>
  
          <button
            className="text-xl rounded-md font-semibold bg-white text-black p-3"
            onClick={handleOTPSubmit}
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  

export default ConfirmPhno