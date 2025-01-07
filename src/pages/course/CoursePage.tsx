import { Clock, Play, CheckCircle, RefreshCw, FileX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CustomLayout from '@/components/layout/custom-layout/CustomLayout';
import { CourseType, VideoType } from '@/types/data';
import { getAllCourses, getUserProgressForCourse, getVideosForCourse } from './contentData';
import { Tabs, TabsList, TabsTrigger } from '../news/Tabs';

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
  const [currentTab, setCurrentTab] = useState("all");

  const calculateProgress = (courseId: string) => {
    return getUserProgressForCourse(mockCurrentUser.id, courseId);
  };

  const handleCourseClick = (courseId: string) => {
    navigate(`/courseVideos/${courseId}`);
  };

  const calculateTotalDuration = (courseVideos: VideoType[]) => {
    return courseVideos.reduce((total, video) => total + video.duration, 0);
  };

  const filterCourses = (courses: CourseType[]) => {
    switch (currentTab) {
      case "in-progress":
        return courses.filter(course => {
          const progress = calculateProgress(course._id);
          return progress > 0 && progress < 100;
        });
      case "not-started":
        return courses.filter(course => calculateProgress(course._id) === 0);
      case "completed":
        return courses.filter(course => calculateProgress(course._id) === 100);
      default:
        return courses;
    }
  };

  const filteredCourses = filterCourses(courses);


  return (
    <CustomLayout>
      <div className="min-h-screen py-12 pt-0 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-4xl font-bold text-white">Courses</h1>
            <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab}>
              <TabsList style={{ backgroundColor: '#111827', color: 'white' }}>
                <TabsTrigger value="all" className="data-[state=active]:bg-gray-800 data-[state=active]:text-white">All</TabsTrigger>
                <TabsTrigger value="in-progress" className="data-[state=active]:bg-gray-800 data-[state=active]:text-white">Ongoing</TabsTrigger>
                <TabsTrigger value="not-started" className="data-[state=active]:bg-gray-800 data-[state=active]:text-white">New</TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-gray-800 data-[state=active]:text-white">Completed</TabsTrigger>
              </TabsList>
            </Tabs>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full col-span-1 md:col-span-2 lg:col-span-3 min-h-[400px]">
                <FileX className="h-16 w-16 text-gray-400 mb-4" />
                <p className="text-gray-400 text-lg">
                  No courses found.
                </p>
              </div>
            )}
            {filteredCourses.map((course) => {
              const videos = getVideosForCourse(course._id);
              const totalDuration = calculateTotalDuration(videos);

              return (
                <div
                  key={course._id}
                  className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
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
                      className="w-full py-2 px-4 bg-blue-900 hover:bg-blue-700 text-white rounded-lg transition duration-300 flex items-center justify-center gap-2"
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