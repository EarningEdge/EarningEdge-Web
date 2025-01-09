import { Clock, Play, CheckCircle, RefreshCw, FileX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
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

const CoursePage = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            // const totalDuration = calculateTotalDuration(videos);

            return (
              <div
                onClick={() => handleCourseClick(course._id)}
                className="relative cursor-pointer rounded-xl overflow-hidden border border-blue-900/90 hover:border-blue-600/80 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/40"
              >
                {/* Image Section */}
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  {/* Video Count Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1.5">
                    <Play size={14} />

                    <span>{videos.length === 1 ? "1 video" : `${videos.length} videos`}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-3 flex justify-between items-start gap-1">
                  {/* Left: Title and Description */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-base text-white line-clamp-1 mb-1.5">
                      {course.title}
                    </h3>
                    <p className="text-gray-200 text-xs line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  {/* Right: Progress Circle */}
                  <div className="relative w-14 h-14 shrink-0">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="28"
                        cy="28"
                        r="20"
                        className="stroke-gray-200"
                        fill="none"
                        strokeWidth="5"
                      />
                      <circle
                        cx="28"
                        cy="28"
                        r="20"
                        className="stroke-green-500"
                        fill="none"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 24}`}
                        strokeDashoffset={`${2 * Math.PI * 24 * (1 - calculateProgress(course._id) / 100)}`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center text-gray-200 justify-center text-xs font-medium">
                      {calculateProgress(course._id)}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;