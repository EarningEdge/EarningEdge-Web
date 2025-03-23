import { useState, useEffect } from "react";
import CustomLayout from "../../components/layout/custom-layout/CustomLayout";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import useAxios from "@/hooks/useAxios";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { login } from "@/redux/slices/authSlice";

const ManageSubscription = () => {
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);



  const { token, user } = useAppSelector((state) => state.auth);
  if (!user) return <Navigate to="/auth" />;
  const api = useAxios();

  const { data: userData } = useQuery({
    queryKey: ["user", user._id],
    queryFn: async () => {
      return await api.get("/user/details/" + user._id);
    },
  });
  console.log(user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userData) {
      dispatch(
        login({
          token,
          user: userData?.data?.data?.userData,
        })
      );
    }
  }, [userData]);




  // Calculate expiry date and days remaining
  useEffect(() => {
    if (user?.planExpirationDate) {
      const expirationTimestamp = user?.planExpirationDate * 1000; // Convert to milliseconds
      const expiryDate = new Date(expirationTimestamp);
      const currentDate = new Date();
      const timeDifference = expiryDate.getTime() - currentDate.getTime();
      const daysRemaining = Math.max(
        Math.ceil(timeDifference / (1000 * 60 * 60 * 24)),
        0
      );
      setExpirationDate(expiryDate);
      setDaysLeft(daysRemaining);
    }
    setLoading(false);
  }, [user]);

  const handleCancel = async () => {
    try {
      setCanceling(true);
      if (user?.planStatus === 'active') {

        const response = await axios.post(
          `http://localhost:8002/api/v1/plans/cancel-subscription`,
          { userId: user?._id }
        );
        // console.log(response.data);
        if (response) {
          toast.success("Subscription canceled successfully");
          window.location.reload(); // Reload the page after cancellation
        }
      }

      if (user?.planStatus === 'canceled') {
        const response = await axios.post(
          `http://localhost:8002/api/v1/plans/re-activate-subscription`,
          { userId: user?._id }
        );
        console.log(response)
        if (response) {
          toast.success("Subscription re-activated successfully");
          window.location.reload();
        }
      }// Reload the page after cancellation
    } catch (error: any) {
      console.error("Error canceling subscription:", error);
      toast.error(error.response?.data?.message || "Failed to cancel subscription");
    } finally {
      setCanceling(false);
    }
  };


  if (loading) {
    return (
      <CustomLayout>
        <div className="flex items-center justify-center min-h-screen text-white">
          <p>Loading subscription details...</p>
        </div>
      </CustomLayout>
    );
  }

  if (user?.planStatus === "Not Subscribed") {
    return (
      <CustomLayout>
        <div className="flex items-center justify-center min-h-screen text-white text-3xl">
          <p>No active subscription found.</p>
        </div>
      </CustomLayout>
    );
  }

  return (
    <CustomLayout>
      <div className="bg-darkBg min-h-screen py-16 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-darkBg rounded-xl shadow-lg p-8 border-gray-800 border-2">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white">
              Manage Your Subscription
            </h2>
            <p className="text-gray-400 mt-2">
              View your plan details and subscription status
            </p>
          </div>

          <div className="bg-darkBg p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-lg font-semibold text-white">
              Your Plan: Pro
            </h3>
            <h3 className="text-lg font-semibold text-white">
              Subscription Status: {user?.planStatus}
            </h3>
            <div className="space-y-3 mt-4">
              <p className="text-gray-400">
                <span className="inline-block w-32">Expiry Date:</span>
                <strong className="text-white">
                  {expirationDate?.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </strong>
              </p>
              <p className="text-gray-400">
                <span className="inline-block w-32">Days Remaining:</span>
                <strong className="text-white">{daysLeft} days</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className={`text-white ${user?.planStatus === "canceled" ? "bg-green-600 hover:bg-green-500" : "bg-red-600 hover:bg-red-500"}  `}
                  disabled={canceling}
                >
                  {user?.planStatus === "canceled" ? "Re-activate Plan" : "Cancel Plan"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-darkBg ">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Once you cancel it cannot be undone. You will lose access to
                    pro features.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    disabled={canceling}
                    className="text-white bg-black"
                  >
                    Go Back
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleCancel}
                    disabled={canceling}
                    className={`${user?.planStatus === "canceled" ? "bg-green-600 hover:bg-green-500" : "bg-red-600 hover:bg-red-500"}  text-white ${canceling ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                  >
                    {user?.planStatus === "canceled" ? "Re-activate Plan" : "Cancel Plan"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </CustomLayout>
  );
};

export default ManageSubscription;
