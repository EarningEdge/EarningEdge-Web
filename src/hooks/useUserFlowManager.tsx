import { useNavigate, useLocation } from 'react-router-dom';

enum SignupStep {
  EMAIL = 1,
  // EMAIL_OTP = 2,
  PHONE = 2,
  PHONE_OTP = 3,
  USER_DETAILS = 4,
}

interface SignupState {
  email: string;
  // emailVerified: boolean;
  phoneNumber: string;
  phoneVerified: boolean;
}

const initialState: SignupState = {
  email: '',
  // emailVerified: false,
  phoneNumber: '',
  phoneVerified: false,
};

export const useSignupFlow = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentStep = (): SignupStep => {
    switch (location.pathname) {
      case '/signup':
        return SignupStep.EMAIL;
      // case '/confirm-email':
      //   return SignupStep.EMAIL_OTP;
      case '/add-phno':
        return SignupStep.PHONE;
      case '/confirm-phno':
        return SignupStep.PHONE_OTP;
      case '/user-details':
        return SignupStep.USER_DETAILS;
      default:
        return SignupStep.EMAIL;
    }
  };

  const getStoredState = (): SignupState => {
    const storedState = localStorage.getItem('signupState');
    return storedState ? JSON.parse(storedState) : initialState;
  };

  const saveState = (state: SignupState) => {
    localStorage.setItem('signupState', JSON.stringify(state));
  };

  const clearState = () => {
    localStorage.removeItem('signupState');
  };

  const updateState = (updates: Partial<SignupState>) => {
    const currentState = getStoredState();
    const newState = { ...currentState, ...updates };
    saveState(newState);
    return newState;
  };

  const goToNextStep = () => {
    const currentStep = getCurrentStep();
    const nextStep = currentStep + 1;
    if (nextStep <= SignupStep.USER_DETAILS) {
      navigateToStep(nextStep);
    }
  };

  const navigateToStep = (step: SignupStep) => {
    switch (step) {
      case SignupStep.EMAIL:
        navigate('/signup');
        break;
      // case SignupStep.EMAIL_OTP:
      //   navigate('/confirm-email');
      //   break;
      case SignupStep.PHONE:
        navigate('/add-phno');
        break;
      case SignupStep.PHONE_OTP:
        navigate('/confirm-phno');
        break;
      case SignupStep.USER_DETAILS:
        navigate('/user-details');
        break;
      default:
        navigate('/signup');
    }
  };

  const validateCurrentStep = () => {
    const state = getStoredState();
    const currentStep = getCurrentStep();
    const expectedStep = getExpectedStep(state);
    if (currentStep !== expectedStep) {
      navigateToStep(expectedStep);
    }
  };

  const getExpectedStep = (state: SignupState): SignupStep => {
    if (!state.email) return SignupStep.EMAIL;
    // if (!state.emailVerified) return SignupStep.EMAIL_OTP;
    if (!state.phoneNumber) return SignupStep.PHONE;
    if (!state.phoneVerified) return SignupStep.PHONE_OTP;
    return SignupStep.USER_DETAILS;
  };

  return {
    getCurrentStep,
    getState: getStoredState,
    updateState,
    clearState,
    goToNextStep,
    validateCurrentStep,
  };
};