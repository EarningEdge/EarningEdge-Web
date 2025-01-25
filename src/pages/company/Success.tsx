import { useAppSelector } from "@/redux/hooks";
import axios from "axios";
import { useEffect } from "react";

type Props = {};

export default function Success({}: Props) {
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?._id;

  useEffect(() => {
    // Extract session ID from query params
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get('session_id');

    if (sessionId) {
      // Call your backend to get the session details
      const res = axios.post<{ url: string }>(
        `${import.meta.env.VITE_BASE_URL}/api/v1/plans/getsession`,
        { userId }
      );
      console.log("res: ", res);
    } else {
      console.error('Session ID not found in URL');
    }
  }, [location.search]);

  function handleClick() {
    console.log('clicked');
    window.location.href = '/home2';
  }

  return (
    <div className="bg-darkBg text-white min-h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-4">Payment Success</h1>
        <p className="text-lg mb-6">Your payment was successful. Thank you!</p>
        <button
          onClick={handleClick}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
