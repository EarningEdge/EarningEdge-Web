import { Clock, Play, CheckCircle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CustomLayout from '@/components/layout/custom-layout/CustomLayout';
import { getAllCourses, getUserProgressForCourse, getVideosForCourse } from './contentData';

const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

const getProgressMessage = (progress: number): string => {
  if (progress === 0) return "Start Course";
  if (progress === 100) return "Course Completed";
  return "Continue Learning";
};

const getProgressIcon = (progress: number) => {
  if (progress === 0) return <Play size={18} />;
  if (progress === 100) return <CheckCircle size={18} />;
  return <RefreshCw size={18} />;
};

const CoursesGrid = () => {
  const navigate = useNavigate();
  const courses = getAllCourses();
  const mockCurrentUser = {
    id: "1"
  };

  const calculateProgress = (courseId: string) => {
    return getUserProgressForCourse(mockCurrentUser.id, courseId);
  };

  const handleCourseClick = (courseId: string) => {
    navigate(`/courseVideos/${courseId}`);
  };

  return (
    <CustomLayout>
      <div className="min-h-screen py-12 pt-0 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">Courses</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => {
              const videos = getVideosForCourse(course._id);
              const totalDuration = videos.reduce((acc) => acc + 3600, 0); // Assuming 1 hour per video for demo

              return (
                <div
                  key={course._id}
                  onClick={() => handleCourseClick(course._id)}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-44 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                  </div>

                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-2">{course.title}</h2>
                    <p className="text-gray-400 mb-4">{course.description}</p>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center text-blue-400">
                        <Play size={16} className="mr-1" />
                        <span>{videos.length} videos</span>
                      </div>
                      <div className="flex items-center text-blue-400">
                        <Clock size={16} className="mr-1" />
                        <span>{formatDuration(totalDuration)}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{calculateProgress(course._id)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${calculateProgress(course._id)}%` }}
                        />
                      </div>
                    </div>

                    <button
                      className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300 flex items-center justify-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCourseClick(course._id);
                      }}
                    >
                      {getProgressIcon(calculateProgress(course._id))}
                      {getProgressMessage(calculateProgress(course._id))}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </CustomLayout>
  );
};

export default CoursesGrid;