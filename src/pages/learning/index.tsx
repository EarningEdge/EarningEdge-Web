import React from 'react';
import CustomLayout from '../../components/layout/custom-layout/CustomLayout';

interface Video {
  id: string;
  title: string;
}

const LearningSection: React.FC = () => {
  // List of video IDs and titles
  const videos: Video[] = [
    { id: '508c10J-ipc', title: 'Introduction' },
    // { id: 'ZZ5LpwO-An4', title: 'Video 2' },
    // { id: 'y6120QOlsfU', title: 'Video 3' },
    // { id: '9bZkp7q19f0', title: 'Video 4' },
  ];

  return (
    <CustomLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-slate-400">Learning Section</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{video.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CustomLayout>
  );
};

export default LearningSection;