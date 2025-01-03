import React, { useState } from "react";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";
import CustomLayout from "../../components/layout/custom-layout/CustomLayout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// Type for playlist data
interface Playlist {
  _id: string;
  title: string;
  description: string;
  videoCount: number;
}

// Type for subscription status
interface SubscriptionStatus {
  status: boolean;
}

const PlaylistsPage: React.FC = () => {
  const api = useAxios();
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);

  // Fetch playlists using useQuery
  const { data: playlists, isLoading, error } = useQuery<{ data: Playlist[] }>({
    queryKey: ["playlists"],
    queryFn: async () => {
      const response = await api.get("/playlist/getAll");
      return response.data;
    },
  });

  // Fetch subscription status with explicit typing for `onSuccess`
  const { data, isLoading: loadingSubscription, error: subscriptionError } = useQuery<SubscriptionStatus, Error>({
    queryKey: ["enrollmentStatus"],
    queryFn: async () => {
      const response = await api.get("/user/getEnrollmentStatus");
      console.log(data);
      console.log("response.data.data.isEnrolled: ", response.data.data.isEnrolled);

      if (!response.data.data.isEnrolled) {
        setIsSubscribed(false);
        console.log("Not Subscribed");
      }

      if (response.data.data.isEnrolled) {
        setIsSubscribed(true);
        console.log("Subscribed");
      }

      return response.data.data;
    },
    onSuccess: (data: SubscriptionStatus) => {
      setIsSubscribed(data.status);
    },
  } as UseQueryOptions<SubscriptionStatus, Error, SubscriptionStatus>);


  const stripePromise = loadStripe("pk_test_51QdAO3RJiGRik51pha5mmd2EWtDDjiPb7S50uR6ghUMb5uRazBwFWNNBE5fCvwYk0Jlb9BpEbH8Ff6sxsXoh31gk00Mw9Y0gGn");

  // Loading and error handling
  if (loadingSubscription || isLoading)
    return <CustomLayout>
      <div className="flex text-white justify-center items-center h-screen">Loading...</div>;
    </CustomLayout>
  if (subscriptionError || error)
    return <CustomLayout><div className="flex text-white justify-center items-center h-screen">Error loading data</div>;</CustomLayout>

  return (
    <CustomLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl mb-6 text-slate-300">Learning Playlists</h1>

        {isSubscribed ? (
          // Show playlists if the user is subscribed
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists?.data.map((playlist) => (
              <Link
                key={playlist._id}
                to={`/learning/${playlist._id}`}
                className="bg-darkSecondary border-darkStroke border-[0.4px] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-4">
                  <h2 className="text-xl text-white mb-2">{playlist.title}</h2>
                  <p className="text-gray-300 mb-2">{playlist.description}</p>
                  <p className="text-sm text-gray-300">{playlist.videoCount} videos</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Show Stripe payment form if the user is not subscribed
          <div className="text-center">
            <p className="text-xl text-red-500 mb-4">Please subscribe to access the playlists</p>
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        )}
      </div>
    </CustomLayout>
  );
};

export default PlaylistsPage;
