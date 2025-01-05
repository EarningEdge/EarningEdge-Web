import React, { useState } from "react";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";
import CustomLayout from "../../components/layout/custom-layout/CustomLayout";
import { loadStripe } from "@stripe/stripe-js";
import { useAppSelector } from "@/redux/hooks";
import LockedContent from "./LockedContent";
import LoaderComponent from "./LoaderComponent";
import { Loader2 } from "lucide-react";

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
  const { data: playlists, isLoading, error } = useQuery<{ data: Playlist[] }>({
    queryKey: ["playlists"],
    queryFn: async () => {
      const response = await api.get("/playlist/getAll");
      console.log(response.data);
      return response.data;
    },
  });

  // Fetch subscription status with explicit typing for `onSuccess`
  const { isLoading: loadingSubscription, error: subscriptionError } = useQuery<SubscriptionStatus, Error>({
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
            <>
              <h1 className="text-3xl mb-6 text-slate-300">Courses</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {playlists?.data.map((playlist) => (
                  <Link
                    key={playlist.playlist._id}
                    to={`/learning/${playlist.playlist._id}`}
                    className="bg-darkSecondary border-darkStroke border-[0.4px] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="p-4">
                      <h2 className="text-xl text-white mb-2">{playlist.playlist.title}</h2>
                      <p className="text-gray-300 mb-2">{playlist.playlist.description}</p>
                      <p className="text-sm text-gray-300">{playlist.playlist.videoCount} videos</p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
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
