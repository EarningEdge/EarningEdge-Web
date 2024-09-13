import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import usePostData from '../../../hooks/usePut';
import { useAppDispatch } from '../../../redux/hooks';
import { login } from '../../../redux/slices/authSlice';
import { IUser } from '../../../types/data';
import { useSignupFlow } from '../../../hooks/useUserFlowManager';

const UserDetails: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [occupation, setOccupation] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [refferalUserName, setRefferalUserName] = useState<string>('');
  const [inviteCodeFromLocal, setInviteCodeFromLocal] = useState<string|null>(null)  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { validateCurrentStep } = useSignupFlow();

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

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (firstName.length < 3 || firstName.includes(' ')) {
      newErrors.firstName = 'First name must be at least 3 characters and a single word';
    }

    if (lastName.length < 3 || lastName.includes(' ')) {
      newErrors.lastName = 'Last name must be at least 3 characters and a single word';
    }

    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!occupation) {
      newErrors.occupation = 'Occupation is required';
    }

    if (referralCode && (referralCode.length !== 6 || !/^[a-zA-Z0-9]+$/.test(referralCode))) {
      newErrors.referralCode = 'Referral code must be 6 alphanumeric characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const userId = localStorage.getItem('userId');
      if (userId && firstName && lastName && password && occupation) {
        await postData({ userId, firstName, lastName, password, occupation, referralCode });
      }
    }
  };

  useEffect(() => {
    validateCurrentStep();
    if (data?.success) {
      localStorage.removeItem("refferalUserName");
      localStorage.removeItem("inviteCode");
      localStorage.removeItem("emailVerified");
      localStorage.removeItem("userPhoneNumber");
      localStorage.removeItem("phoneVerified");
      localStorage.removeItem("userId");
      localStorage.removeItem("signupState");
      dispatch(login({ user: data.user!, token: data.token }));
      navigate('/');
    } else if (error) {
      if(error.status==404){
        message.error("Invalid status code");
        return
      }
      message.error(error.message || 'Failed to create account');
    }
  }, [data, error, navigate, dispatch]);

  useEffect(() => {
    const refferalUserNameFromLocal = localStorage.getItem("refferalUserName");
    const inviteCodeFromLocal1 = localStorage.getItem("inviteCode");
    if(inviteCodeFromLocal1?.length===6){
      setInviteCodeFromLocal(inviteCodeFromLocal1)
    }
    if (refferalUserNameFromLocal) {
      const arr = refferalUserNameFromLocal.split("_");
      if (arr?.length === 2) {
        setRefferalUserName(arr[0].toUpperCase() + " " + arr[1].toUpperCase());
      }
    }
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen flex items-end p-5 auth relative">
      <div className="h-[90vh] w-full dark:bg-black bg-black dark:bg-dot-white/[0.2] bg-dot-white/[0.2] relative flex items-end justify-center">
        <div className="absolute top-0"></div>
        <div className="flex flex-col text-white gap-3 mb-10 z-10 w-full md:w-[30%]">
          <h1 className="text-5xl font-light">Final <b>Step!</b></h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className={`p-3 bg-black text-white focus:outline-none text-xl border-[0.5px] ${errors.firstName ? 'border-red-500' : 'border-white'} rounded-md w-full`}
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div className="mb-3">
              <input
                type="text"
                className={`p-3 bg-black text-white text-xl focus:outline-none border-[0.5px] ${errors.lastName ? 'border-red-500' : 'border-white'} rounded-md w-full`}
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
            <div className="mb-3">
              <input
                type="password"
                className={`p-3 bg-black text-white focus:outline-none text-xl border-[0.5px] ${errors.password ? 'border-red-500' : 'border-white'} rounded-md w-full`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <div className="mb-3">
              <input
                type="password"
                className={`p-3 bg-black text-white focus:outline-none text-xl border-[0.5px] ${errors.confirmPassword ? 'border-red-500' : 'border-white'} rounded-md w-full`}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
            <div className="mb-3">
              <input
                type="text"
                className={`p-3 bg-black text-white focus:outline-none text-xl border-[0.5px] ${errors.occupation ? 'border-red-500' : 'border-white'} rounded-md w-full`}
                placeholder="Occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                required
              />
              {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
            </div>
            <div className="mb-3">
              <input
                type="text"
                disabled={inviteCodeFromLocal!==null}
                className={`p-3 bg-black text-white focus:outline-none text-xl border-[0.5px] ${errors.referralCode ? 'border-red-500' : 'border-white'} rounded-md w-full`}
                placeholder="Referral Code (Optional)"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
              {errors.referralCode && <p className="text-red-500 text-sm mt-1">{errors.referralCode}</p>}
            </div>
            {refferalUserName && <p className='text-slate-400 text-sm mb-3'>Invited by: {refferalUserName}</p>}
            <button
              type="submit"
              className="mt-3 text-xl rounded-md font-semibold bg-white text-black p-3 w-full disabled:opacity-50 disabled:cursor-not-allowed"
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