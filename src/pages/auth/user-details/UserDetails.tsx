import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import usePostData from '../../../hooks/usePut';
import { useAppDispatch } from '../../../redux/hooks';
import { login } from '../../../redux/slices/authSlice';
import { IUser } from '../../../types/data';

const UserDetails: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [occupation, setOccupation] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const navigate = useNavigate();
  const  dispatch = useAppDispatch()
  const { data, loading, error, postData } = usePostData<{
    userId: string;
    firstName: string;
    lastName: string;
    password: string;
    occupation: string;
    referralCode: string;
  }, {
    message: string; success: boolean; user?: IUser,token:string
}>('/user/createUser');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      message.error('Passwords do not match');
      return;
    }
    const userId = localStorage.getItem('userId');
    if (userId && firstName && lastName && password && occupation) {
      await postData({ userId, firstName, lastName, password, occupation, referralCode });
    }
  };

  useEffect(() => {
    if (data?.success) {
      dispatch(login({user:data.user!,token:data.token}))
      navigate('/');
    } else if (error) {
      message.error(error.message || 'Failed to create account');
    }
  }, [data, navigate]);

  useEffect(() => {
    if (error) {
      //@ts-ignore
      message.error(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  }, [error]);

  return (
    <div className="bg-gray-900 min-h-svh flex items-end p-5">
      <div className="flex flex-col text-white gap-3 mb-10 w-full">
        <h1 className="text-5xl">Create an<br /> <b>Account</b></h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="p-3 bg-transparent text-white text-xl border-2 border-white rounded-md w-full mb-3"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            className="p-3 bg-transparent text-white text-xl border-2 border-white rounded-md w-full mb-3"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="password"
            className="p-3 bg-transparent text-white text-xl border-2 border-white rounded-md w-full mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="p-3 bg-transparent text-white text-xl border-2 border-white rounded-md w-full mb-3"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <input
            type="text"
            className="p-3 bg-transparent text-white text-xl border-2 border-white rounded-md w-full mb-3"
            placeholder="Occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            required
          />
          <input
            type="text"
            className="p-3 bg-transparent text-white text-xl border-2 border-white rounded-md w-full mb-3"
            placeholder="Referral Code (Optional)"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />
          <button
            type="submit"
            className="mt-3 text-xl rounded-md font-semibold bg-white text-black p-3 w-full"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;