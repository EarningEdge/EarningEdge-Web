interface Progress {
  id: bigint;
  userId: string;
  videoId: string;
  courseId: bigint;
}

interface Video {
  id: bigint;
  title: string;
  description: string;
  courseId: string;
  thumbnail: string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface Timestamp {
  id: bigint;
  videoId: string;
  startTime: bigint;
  endTime: bigint;
  name: string;
}




const courses: Course[] = [
  {
    _id: "course1",
    title: "Stock Market Fundamentals",
    description: "Master the basics of stock market trading and analysis",
    thumbnail: "https://img.freepik.com/free-vector/gradient-stock-market-concept_23-2149166910.jpg"
  },
  {
    _id: "course2",
    title: "Advanced Trading Psychology",
    description: "Master discipline, patience, and focus to excel in trading",
    thumbnail: "https://img.freepik.com/free-vector/forex-trading-background_52683-41365.jpg"
  },
  {
    _id: "course3",
    title: "Technical Analysis Masterclass",
    description: "Complete guide to technical analysis patterns and indicators",
    thumbnail: "https://img.freepik.com/free-vector/forex-trading-background_52683-41364.jpg"
  },
  {
    _id: "course4",
    title: "Fundamental Analysis Deep Dive",
    description: "Learn to analyze stocks using fundamental analysis",
    thumbnail: "https://img.freepik.com/free-vector/realistic-financial-graph-background_23-2149139457.jpg"
  },
  {
    _id: "course5",
    title: "Options Trading Basics",
    description: "Introduction to options trading strategies",
    thumbnail: "https://img.freepik.com/free-vector/forex-trading-stock-market-background_1017-31713.jpg"
  },
  {
    _id: "course6",
    title: "Risk Management Essentials",
    description: "Learn crucial risk management techniques",
    thumbnail: "https://img.freepik.com/free-vector/gradient-stock-market-concept_23-2149166912.jpg"
  }
]

const videos: Video[] = [
  // Course 1 videos
  {
    id: BigInt(1),
    title: "Understanding Stock Market Basics",
    description: "Learn key concepts about stock exchanges, market participants, and trading mechanics",
    courseId: "course1",
    thumbnail: "https://i.ytimg.com/vi/Xn7KWR9EOGQ/maxresdefault.jpg"
  },
  {
    id: BigInt(2),
    title: "Market Structure and Order Types",
    description: "Deep dive into market structure and various order types",
    courseId: "course1",
    thumbnail: "https://i.ytimg.com/vi/Xn7KWR9EOGQ/maxresdefault.jpg"
  },

  // Course 2 videos
  {
    id: BigInt(3),
    title: "Trading Psychology Fundamentals",
    description: "Understanding the psychological aspects of trading",
    courseId: "course2",
    thumbnail: "https://i.ytimg.com/vi/8FLbiOnLOpY/maxresdefault.jpg"
  },

  // Course 3 videos
  {
    id: BigInt(4),
    title: "Chart Patterns Introduction",
    description: "Learn to identify and trade chart patterns",
    courseId: "course3",
    thumbnail: "https://i.ytimg.com/vi/HAZxbGWmhKw/maxresdefault.jpg"
  },
  {
    id: BigInt(5),
    title: "Technical Indicators Deep Dive",
    description: "Master technical indicators and oscillators",
    courseId: "course3",
    thumbnail: "https://i.ytimg.com/vi/HAZxbGWmhKw/maxresdefault.jpg"
  },

  // Course 4 videos
  {
    id: BigInt(6),
    title: "Financial Statement Analysis",
    description: "Learn to analyze company financial statements",
    courseId: "course4",
    thumbnail: "https://i.ytimg.com/vi/kJSjtr-gjkE/maxresdefault.jpg"
  },

  // Course 5 videos
  {
    id: BigInt(7),
    title: "Options Basics",
    description: "Introduction to options trading concepts",
    courseId: "course5",
    thumbnail: "https://i.ytimg.com/vi/7PWkN9viNxA/maxresdefault.jpg"
  },
  {
    id: BigInt(8),
    title: "Options Strategies",
    description: "Common options trading strategies",
    courseId: "course5",
    thumbnail: "https://i.ytimg.com/vi/7PWkN9viNxA/maxresdefault.jpg"
  },

  // Course 6 videos
  {
    id: BigInt(9),
    title: "Risk Management Foundations",
    description: "Essential risk management principles",
    courseId: "course6",
    thumbnail: "https://i.ytimg.com/vi/9LTRx5jHsXc/maxresdefault.jpg"
  }
]

const timestamps: Timestamp[] = [
  // Timestamps for Video 1
  {
    id: BigInt(1),
    videoId: "1",
    startTime: BigInt(150), // 2:30
    endTime: BigInt(525), // 8:45
    name: "What is a Stock Exchange"
  },
  {
    id: BigInt(2),
    videoId: "1",
    startTime: BigInt(525), // 8:45
    endTime: BigInt(920), // 15:20
    name: "Types of Market Participants"
  },

  // Timestamps for Video 2
  {
    id: BigInt(3),
    videoId: "2",
    startTime: BigInt(180), // 3:00
    endTime: BigInt(600), // 10:00
    name: "Market Order Types"
  },

  // Continue pattern for other videos...
]

const progress: Progress[] = [
  // User 1 progress
  {
    id: BigInt(1),
    userId: "1",
    videoId: "1",
    courseId: BigInt(1)
  },
  {
    id: BigInt(2),
    userId: "1",
    videoId: "2",
    courseId: BigInt(1)
  },

  // Course 3 - 1 video completed
  {
    id: BigInt(3),
    userId: "1",
    videoId: "4",
    courseId: BigInt(3)
  },

  // User 2 progress
  {
    id: BigInt(3),
    userId: "2",
    videoId: "1",
    courseId: BigInt(1)
  },
]

export const getAllCourses = () => {
  return courses;
};

export const getVideosForCourse = (courseId: string) => {
  return videos.filter(video => video.courseId === courseId);
};

export const getTimestampsForVideo = (videoId: string) => {
  return timestamps.filter(timestamp => timestamp.videoId === videoId);
};

export const getUserProgress = (userId: string) => {
  return progress.filter(progress => progress.userId === userId);
};

export const getUserProgressForCourse = (userId: string, courseId: string) => {
  const userProgress = progress.filter(p =>
    p.userId === userId &&
    p.courseId === BigInt(courseId.replace('course', ''))
  );
  const courseVideos = videos.filter(v => v.courseId === courseId);

  if (!courseVideos.length) return 0;
  return Math.round((userProgress.length / courseVideos.length) * 100);
};