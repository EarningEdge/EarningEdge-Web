import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Clock, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { getAllCourses, getVideosForCourse, getTimestampsForVideo, getUserProgress } from './contentData';
import CustomLayout from '@/components/layout/custom-layout/CustomLayout';
import { VideoType, CourseType, TimestampType } from '@/types/data';


const VideoPage = () => {
  const { courseId } = useParams();

  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);
  const [courseVideos, setCourseVideos] = useState<VideoType[]>([]);
  const [courseInfo, setCourseInfo] = useState<CourseType | null>(null);
  const [timestamps, setTimestamps] = useState<TimestampType[]>([]);
  const [isVideoListOpen, setIsVideoListOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);


  // Load user progress when course changes
  useEffect(() => {
    if (courseId) {
      // Replace '1' with actual userId from your auth system
      const userProgress = getUserProgress('1');
      const completedVideoIds = userProgress.map(p => p.videoId);
      setCompletedVideos(completedVideoIds);
    }
  }, [courseId]);


  // Load course data when courseId changes
  useEffect(() => {
    if (courseId) {
      const videos = getVideosForCourse(courseId as string);
      const course = getAllCourses().find((c: CourseType) => c._id === courseId);
      setCourseVideos(videos);
      setCourseInfo(course || null);
      setSelectedVideo(videos[0] || null);
      setIsPlaying(false);
    }
  }, [courseId]);

  // Update timestamps when a new video is selected
  useEffect(() => {
    if (selectedVideo) {
      const videoTimestamps = getTimestampsForVideo(selectedVideo.id.toString());
      setTimestamps(videoTimestamps);
      setIsPlaying(false);
    }
  }, [selectedVideo]);

  // fromat duration to mm:ss
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleVideoCompletion = () => {
    if (!selectedVideo) return;

    setCompletedVideos(prev => {
      const videoId = selectedVideo.id.toString();
      if (prev.includes(videoId)) {
        return prev.filter(id => id !== videoId);
      }
      return [...prev, videoId];
    });
  };

  return (
    <CustomLayout>
      <div className="flex flex-col lg:flex-row min-h-screen ">
        {/* Video List Sidebar */}
        <div className="lg:w-1/4 p-4  lg:overflow-hidden">
          <div className="flex flex-col mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">{courseInfo?.title}</h2>
              <button
                onClick={() => setIsVideoListOpen(!isVideoListOpen)}
                className="lg:hidden text-white hover:text-blue-400 transition-colors"
              >
                {isVideoListOpen ? <ChevronUp /> : <ChevronDown />}
              </button>
            </div>
            <div className="flex items-center gap-2  mt-2">
              <Play size={18} className="text-blue-400" />
              <span className="text-sm flex items-center gap-2 text-blue-400  ">
                {courseVideos.length} lessons
              </span>
            </div>


          </div>

          <div className={`${isVideoListOpen ? 'block' : 'hidden'} p-2 lg:block lg:h-[100vh] lg:overflow-y-auto custom-scrollbar space-y-4 relative`}>
            {courseVideos.map((video) => (
              <div
                key={video.id.toString()}
                onClick={() => {
                  setSelectedVideo(video);
                  setIsPlaying(false);
                  setIsVideoListOpen(!isVideoListOpen)
                }}
                className={`
  relative rounded-lg overflow-visible cursor-pointer
  transition-all duration-300 mt-3 
  border border-blue-900/60 hover:border-blue-600/60
  hover:shadow-lg hover:shadow-blue-900/20
  ${selectedVideo?.id === video.id
                    ? 'border-blue-700 shadow-lg shadow-blue-900/30'
                    : ''}
`}
              >
                {/* Completion Badge */}
                {completedVideos.includes(video.id.toString()) && (
                  <div className="absolute -top-2 -left-2 z-[100]">
                    <div className="bg-green-500 rounded-full p-1 ring-2 ring-gray-900 shadow-md flex items-center justify-center w-5 h-5">
                      <Check className="w-4 h-4 text-white stroke-[5]" />
                    </div>
                  </div>
                )}
                <div className="flex gap-4 p-4 ">
                  {/* Thumbnail with Play Icon */}
                  <div className="relative w-24 h-16 flex-shrink-0 rounded-md overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-6 h-6 text-white/90" />
                    </div>
                  </div>


                  {/* Video Info */}
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-white line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center mt-2">
                      <Clock className="w-4 h-4 text-blue-400 mr-1" />
                      <span className="text-xs text-gray-400">
                        {formatDuration(video.duration)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4 p-4 rounded-lg border border-blue-900/20 ">
          {selectedVideo && (
            <>
              {/* Video Player/Thumbnail */}
              <div className="w-full aspect-video bg-black rounded-lg overflow-hidden mb-6 relative ">
                {!isPlaying ? (
                  <div
                    className="relative w-full h-full cursor-pointer group"
                    onClick={() => setIsPlaying(true)}
                  >
                    <img
                      src={selectedVideo.thumbnail}
                      alt={selectedVideo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all">
                      <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <iframe
                    className="w-full h-full"
                    src={`${selectedVideo.videoUrl.replace('watch?v=', 'embed/')}?autoplay=1`}
                    title={selectedVideo.title}
                    allowFullScreen
                    allow="autoplay"
                  />
                )}
              </div>

              {/* Video Info */}
              <div className="mb-8">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                  <h1 className="text-3xl font-bold text-white">
                    {selectedVideo.title}
                  </h1>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVideoCompletion();
                    }}
                    className={`
    flex items-center gap-2 px-4 py-2 rounded-lg font-medium
    transition-all duration-200 
    ${completedVideos.includes(selectedVideo.id.toString())
                        ? 'bg-blue-900 text-white hover:bg-blue-700'
                        : 'border-2 border-blue-900/60 text-blue-400 hover:bg-blue-500/10'}
    hover:shadow-lg transform hover:-translate-y-0.5
  `}
                  >
                    {completedVideos.includes(selectedVideo.id.toString()) ? (
                      <>
                        <Check className="w-5 h-5 stroke-[3]" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5 stroke-[3]" />
                        <span>Mark as Complete</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-gray-400 text-base">
                  {selectedVideo.description}
                </p>
              </div>

              {/* Timestamps */}
              {timestamps.length > 0 && (
                <div className=" rounded-lg p-4 border border-blue-900/60 hover:border-blue-600/60 transition-all duration-300">
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Video Time Stamps
                  </h2>
                  <div className="space-y-3">
                    {timestamps.map((timestamp) => (
                      <div
                        key={timestamp.id.toString()}
                        className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md cursor-pointer transition-colors"
                      >
                        <Play className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-white font-medium">
                            {timestamp.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            {Math.floor(Number(timestamp.startTime) / 60)}:
                            {String(Number(timestamp.startTime) % 60).padStart(2, '0')} -
                            {Math.floor(Number(timestamp.endTime) / 60)}:
                            {String(Number(timestamp.endTime) % 60).padStart(2, '0')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </CustomLayout>
  );
};

export default VideoPage;