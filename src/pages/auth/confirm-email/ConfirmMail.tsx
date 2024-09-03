import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import usePostData from '../../../hooks/usePut';
import { IUser } from '../../../types/data';

const ConfirmMail: React.FC = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const { data, loading, error, postData } = usePostData<{ otp: string; email: string }, {
     status: string; data?: IUser 
}>('/user/verifyEmail');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = localStorage.getItem('userEmail');
    if (otp && email) {
      await postData({ otp, email });
    }
  };

  useEffect(() => {
    if (data?.status==="success") {
      navigate('/add-phno');
    } else if (error) {
      message.error(error.message || 'Verification failed');
    }
  }, [data, navigate]);

  useEffect(() => {
    if (error) {
      //@ts-ignore
      message.error(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  }, [error]);

  return (
    <div className="bg-gray-900 min-h-svh flex items-end p-5 auth">
      <div className="flex flex-col text-white gap-3 mb-10 w-full">
        <h1 className="text-5xl">Create an<br /> <b>Account</b></h1>
        <p>OTP sent to {localStorage.getItem('userEmail')}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="p-3 bg-black text-white text-xl border-2 border-white rounded-md w-full"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-3 text-xl rounded-md font-semibold bg-white text-black p-3 w-full"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Next'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmMail;