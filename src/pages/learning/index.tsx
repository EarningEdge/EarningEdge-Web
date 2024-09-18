import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CustomLayout from '../../components/layout/custom-layout/CustomLayout';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';

interface Playlist {
  _id: string;
  title: string;
  description: string;
  videoCount: number;
}

const PlaylistsPage: React.FC = () => {
  const api = useAxios();

  const { data: playlists, isLoading, error } = useQuery<{ data: Playlist[] }>({
    queryKey: ['playlists'],
    queryFn: async () => {
      const response = await api.get('/playlist/getAll');
      return response.data;
    },
  });
  useEffect(()=>{console.log(playlists)},[playlists])

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading playlists...</div>;
  if (error) return <div className="text-red-500 text-center">Error loading playlists</div>;

  return (
    <CustomLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl mb-6 text-slate-300">Learning Playlists</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists?.data.map((playlist:any) => (
            <Link 
              key={playlist.playlist._id} 
              to={`/learning/${playlist.playlist._id}`} 
              className=" bg-darkSecondary border-darkStroke border-[0.4px] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-4">
                <h2 className="text-xl text-white mb-2">{playlist.playlist.title}</h2>
                <p className="text-gray-300 mb-2">{playlist.description}</p>
                <p className="text-sm text-gray-300">{playlist.videoCount} videos</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </CustomLayout>
  );
};

export default PlaylistsPage