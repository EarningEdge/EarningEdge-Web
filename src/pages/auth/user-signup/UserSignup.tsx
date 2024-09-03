import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import usePostData from '../../../hooks/usePost';
import { IUser } from '../../../types/data';

const UserSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { data, loading, error, postData } = usePostData<{ email: string }, {
    message: string; success: boolean; userId?: string; email?: string; status:string,data:IUser
  }>('/user/addEmail');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await postData({ email });
    }
  };

  useEffect(() => {
    console.log(data)
    if (data?.status==="success") {
      if (data.data._id && data.data.email) {
        localStorage.setItem('userId', data.data._id);
        localStorage.setItem('userEmail', data.data.email);
        navigate('/confirm-email');
      }
    } else if (data) {
      message.error(data.message || 'Signup failed');
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
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="p-3 bg-black text-white text-xl border-2 border-white rounded-md w-full"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-3 text-xl rounded-md font-semibold bg-white text-black p-3 w-full"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Next'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;
