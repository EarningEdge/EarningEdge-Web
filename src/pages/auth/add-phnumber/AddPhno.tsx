import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import usePostData from '../../../hooks/usePut';

const AddPhno: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const { data, loading, error, postData } = usePostData<{ phoneNumber: string; userId: string }, {
    message: string; status: string 
}>('/user/addPhoneNumber');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    if (phoneNumber && userId) {
      await postData({ phoneNumber:"+91"+phoneNumber, userId });
    }
  };

  useEffect(() => {
    if (data?.status==="success") {
      localStorage.setItem("userPhoneNumber",phoneNumber)
      navigate('/confirm-phno');
    } else if (error) {
      message.error(error.message || 'Failed to add phone number');
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
        <p>Phone number</p>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <input type="text" value="+91" className="p-3 bg-black text-white text-xl border-2 border-white rounded-md w-16" readOnly />
            <input
              type="tel"
              className="p-3 bg-black text-white text-xl border-2 border-white rounded-md w-full"
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
            {loading ? 'Submitting...' : 'Next'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPhno;