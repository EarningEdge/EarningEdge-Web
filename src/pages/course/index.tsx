import React, { useState } from "react";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import CustomLayout from "../../components/layout/custom-layout/CustomLayout";
import { loadStripe } from "@stripe/stripe-js";
import { useAppSelector } from "@/redux/hooks";
import LockedContent from "./LockedContent";
import { Loader2 } from "lucide-react";
import CoursePage from "./CoursePage";

// Type for playlist data
interface Playlist {
  playlist: {
    _id: string;
    title: string;
    description: string;
    videoCount: number;
  }
}

// Type for subscription status
interface SubscriptionStatus {
  status: boolean;
}

const PlaylistsPage: React.FC = () => {
  const api = useAxios();
  const STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY;
  const { user } = useAppSelector((state) => state.auth);
  const [fetchingLoader, setFetchingLoader] = useState<boolean>(true);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  // Fetch playlists using useQuery
  const { data: playlists, error } = useQuery<{ data: Playlist[] }>({
    queryKey: ["playlists"],
    queryFn: async () => {
      const response = await api.get("/playlist/getAll");
      console.log(response.data);
      return response.data;
    },
  });

  // Fetch subscription status with explicit typing for `onSuccess`
  const { error: subscriptionError } = useQuery<SubscriptionStatus, Error>({
    queryKey: ["enrollmentStatus"],
    queryFn: async () => {
      const response = await api.get(`/user/getEnrollmentStatus/${user?._id}`);
      setFetchingLoader(false);
      if (!response.data.data.isEnrolled) {
        setIsSubscribed(false);
      }

      if (response.data.data.isEnrolled) {
        setIsSubscribed(true);
      }
      return response.data.data;
    },
    onSuccess: (data: SubscriptionStatus) => {
      setIsSubscribed(data.status);
    },
  } as UseQueryOptions<SubscriptionStatus, Error, SubscriptionStatus>);

  const stripePromise = loadStripe(STRIPE_KEY);

  // Error handling
  if (subscriptionError || error) {
    return (
      <CustomLayout>
        <div className="flex text-white justify-center items-center h-screen">
          Error loading data
        </div>
      </CustomLayout>
    );
  }

  return (
    <CustomLayout>
      {(fetchingLoader) ? (
        <Loader2 className="w-12 h-12 mt-[10rem] text-slate-300 animate-spin mx-auto" />

      ) : (
        <div className="container mx-auto px-4 py-8">
          {isSubscribed ? (
            <CoursePage />
          ) : (
            <LockedContent
              playlists={playlists}
              stripePromise={stripePromise}
              setIsSubscribed={setIsSubscribed}
              isSubscribed={isSubscribed}
            />
          )}
        </div>
      )}
    </CustomLayout>
  );
};

export default PlaylistsPage;
