import { Link, useParams } from "react-router-dom";
import CustomLayout from "../../components/layout/custom-layout/CustomLayout";
import useAxios from "../../hooks/useAxios";
import React from "react";
import { useQuery } from "@tanstack/react-query";

import HlsPlayer from "./VideoPlayer";
import { ArrowLeft } from "lucide-react";

interface Video {
  _id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  views: number;
}

const VideoPlaylistPage: React.FC = () => {
  const api = useAxios();
  const { playlistId } = useParams<{ playlistId: string }>();
  const [activeVideo, setActiveVideo] = React.useState<Video | null>(null);

  const { data: videos, isLoading, error } = useQuery<{ data: {videos:Video[],playlistName:string} }>({
    queryKey: ['videos', playlistId],
    queryFn: async () => {
      if (!playlistId) return { data: [] };
      const response = await api.get(`/playlist/getAllVideos/${playlistId}`);
      return response.data;
    },
    enabled: !!playlistId,
  });

  React.useEffect(() => {
    if (videos && videos.data?.videos?.length > 0 && !activeVideo) {
      setActiveVideo(videos.data?.videos[0]);
    }
  }, [videos, activeVideo]);

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading videos...</div>;
  if (error) return <div className="text-red-500 text-center">Error loading videos</div>;

  return (
    <CustomLayout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/course" className=" text-slate-400 flex items-center justify-start" > <ArrowLeft size={18}/> Back</Link>
        <h1 className="text-3xl mb-6 text-slate-300">{videos?.data.playlistName} Playlist Videos </h1>
        <div className="space-y-8">
        {activeVideo && (
          <div className="bg-darkSecondary rounded-lg shadow-md overflow-hidden relative">
            <HlsPlayer src={activeVideo.url || ""} />
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-white">{activeVideo.title}</h2>
              <p className="text-gray-400 mt-2">{activeVideo.description}</p>
              <p className="text-sm text-gray-500 mt-2">Views: {activeVideo.views}</p>
            </div>
          </div>
        )}
          
          <div>
            <h3 className="text-2xl text-slate-300 font-semibold mb-4">All Videos in this Playlist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos?.data?.videos.map((video) => (
                <div
                  key={video._id}
                  className={` bg-darkSecondary rounded-lg shadow-md overflow-hidden cursor-pointer transition-shadow duration-300 ${
                    activeVideo?._id === video._id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'
                  }`}
                  onClick={() => setActiveVideo(video)}
                >
                  <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                  <div className="p-4 bg-darkSecondary">
                    <h4 className="font-semibold text-lg mb-2 text-white">{video.title}</h4>
                    <p className="text-gray-200 text-sm mb-2 line-clamp-2">{video.description}</p>
                    <p className="text-sm text-gray-500">Views: {video.views}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CustomLayout>
  );
};

export default VideoPlaylistPage