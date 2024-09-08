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
  const [refferalUserName, setRefferalUserName] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data, loading, error, postData } = usePostData<{
    userId: string;
    firstName: string;
    lastName: string;
    password: string;
    occupation: string;
    referralCode: string;
  }, {
    message: string; success: boolean; user?: IUser, token: string
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
      localStorage.removeItem("refferalUserName");
      localStorage.removeItem("inviteCode");
      dispatch(login({ user: data.user!, token: data.token }));
      navigate('/');
    } else if (error) {
      message.error(error.message || 'Failed to create account');
    }
  }, [data, error, navigate, dispatch]);

  useEffect(() => {
    const refferalUserNameFromLocal = localStorage.getItem("refferalUserName");
    const inviteCodeFromLocal = localStorage.getItem("inviteCode");
    if (refferalUserNameFromLocal && inviteCodeFromLocal) {
      const arr = refferalUserNameFromLocal.split("_");
      if (arr?.length === 2) {
        setRefferalUserName(arr[0].toUpperCase() + " " + arr[1].toUpperCase());
      }
      setReferralCode(inviteCodeFromLocal);
    }
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen flex items-end p-5 auth relative">
      <div className="h-[90vh] w-full dark:bg-black bg-black dark:bg-dot-white/[0.2] bg-dot-white/[0.2] relative flex items-end justify-center">
        <div className="absolute top-0"></div>
        <div className="flex flex-col text-white gap-3 mb-10 z-10 w-full md:w-[30%]">
          <h1 className="text-5xl font-light">Final <b>Step!</b></h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="p-3 bg-black text-white focus:outline-none text-xl border-[0.5px] border-white rounded-md w-full mb-3"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              className="p-3 bg-black text-white text-xl focus:outline-none border-[0.5px] border-white rounded-md w-full mb-3"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="password"
              className="p-3 bg-black text-white focus:outline-none text-xl border-[0.5px] border-white rounded-md w-full mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="p-3 bg-black text-white focus:outline-none text-xl border-[0.5px] border-white rounded-md w-full mb-3"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <input
              type="text"
              className="p-3 bg-black text-white focus:outline-none text-xl border-[0.5px] border-white rounded-md w-full mb-3"
              placeholder="Occupation"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              required
            />
            <input
              type="text"
              disabled={!!referralCode}
              className="p-3 bg-black text-white focus:outline-none text-xl border-[0.5px] border-white rounded-md w-full mb-3"
              placeholder="Referral Code (Optional)"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
            />
            {refferalUserName && <p className='text-slate-400 text-sm'>Invited by: {refferalUserName}</p>}
            <button
              type="submit"
              className="mt-3 text-xl rounded-md font-semibold bg-white text-black p-3 w-full"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
    </div>
  );
};

export default UserDetails;