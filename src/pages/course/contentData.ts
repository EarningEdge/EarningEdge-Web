import { VideoType, CourseType, TimestampType, ProgressType } from '@/types/data';

const courses: CourseType[] = [
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
];

const videos: VideoType[] = [
  // Course 1 videos
  {
    id: BigInt(1),
    title: "Understanding Stock Market Basics",
    description: "Learn the fundamental concepts of stock exchanges, including their purpose and functioning. Explore the roles of key market participants such as brokers,",
    courseId: "course1",
    thumbnail: "https://img.pikbest.com/wp/202403/forex-trading-illuminated-bull-hologram-dominates-chart-in-prosperous-market-investing-and-concept-3d-rendering_9823645.jpg!bw700",
    duration: 1800, // 30 minutes
    videoUrl: "https://www.youtube.com/watch?v=Xn7KWR9EOGQ"
  },
  {
    id: BigInt(2),
    title: "Market Structure and Order Types",
    description: "Deep dive into market structure and various order types",
    courseId: "course1",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAW6eIL5GEmZM5OnLAnGMxbuV8Io1Y6hI1yV22bKeFezE0apdZMxW0OYcgyDCaNFVGgks&usqp=CAU",
    duration: 2400, // 40 minutes
    videoUrl: "https://www.youtube.com/watch?v=QKnZWpIn8SE"
  },
  {
    id: BigInt(16),
    title: "Trading vs Investing: Understanding the Differences",
    description: "Learn the key differences between trading and long-term investing strategies",
    courseId: "course1",
    thumbnail: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/make-money-online-trading-stocks-thumbnail-design-template-0c005589286d5206f26f56dcb3db4e7d_screen.jpg?ts=1624017276",
    duration: 2700, // 45 minutes
    videoUrl: "https://www.youtube.com/watch?v=h7LyG5qFkvM"
  },
  {
    id: BigInt(17),
    title: "Stock Market Indices Explained",
    description: "Deep dive into major market indices like S&P 500, Dow Jones, and NASDAQ",
    courseId: "course1",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKAy1w7Anuwyu2kPOWPWLOKr07pT_q0qBWQw&s",
    duration: 2100, // 35 minutes
    videoUrl: "https://www.youtube.com/watch?v=9OEl84t0p2Q"
  },
  {
    id: BigInt(18),
    title: "Understanding Market Sectors and Industries",
    description: "Learn about different market sectors, industry classifications, and their characteristics",
    courseId: "course1",
    thumbnail: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/make-money-online-trading-forex-thumbnail-design-template-074c787f7731d0044334d35d46994620_screen.jpg?ts=1624017419",
    duration: 3000, // 50 minutes
    videoUrl: "https://www.youtube.com/watch?v=L5bfd0CngRU"
  },
  // Course 2 videos
  {
    id: BigInt(3),
    title: "Trading Psychology Fundamentals",
    description: "Understanding the psychological aspects of trading",
    courseId: "course2",
    thumbnail: "https://i.ytimg.com/vi/8FLbiOnLOpY/maxresdefault.jpg",
    duration: 3600, // 60 minutes
    videoUrl: "https://www.youtube.com/watch?v=8FLbiOnLOpY"
  },
  // Course 3 videos
  {
    id: BigInt(4),
    title: "Chart Patterns Introduction",
    description: "Learn to identify and trade chart patterns",
    courseId: "course3",
    thumbnail: "https://i.ytimg.com/vi/HAZxbGWmhKw/maxresdefault.jpg",
    duration: 2700, // 45 minutes
    videoUrl: "https://www.youtube.com/watch?v=HAZxbGWmhKw"
  },
  {
    id: BigInt(5),
    title: "Technical Indicators Deep Dive",
    description: "Master technical indicators and oscillators",
    courseId: "course3",
    thumbnail: "https://i.ytimg.com/vi/HAZxbGWmhKw/maxresdefault.jpg",
    duration: 3000, // 50 minutes
    videoUrl: "https://www.youtube.com/watch?v=7PWkN9viNxA"
  },
  // Videos for Course 4: Fundamental Analysis Deep Dive
  {
    id: BigInt(6),
    title: "Financial Statement Analysis Basics",
    description: "Learn to read and analyze company balance sheets, income statements, and cash flow statements",
    courseId: "course4",
    thumbnail: "https://i.ytimg.com/vi/kJSjtr-gjkE/maxresdefault.jpg",
    duration: 3600, // 60 minutes
    videoUrl: "https://www.youtube.com/watch?v=kJSjtr-gjkE"
  },


  // Videos for Course 5: Options Trading Basics
  {
    id: BigInt(9),
    title: "Options Fundamentals",
    description: "Understanding calls, puts, strikes, and expiration dates",
    courseId: "course5",
    thumbnail: "https://i.ytimg.com/vi/7PWkN9viNxA/maxresdefault.jpg",
    duration: 2400, // 40 minutes
    videoUrl: "https://www.youtube.com/watch?v=7PWkN9viNxA"
  },


  // Videos for Course 6: Risk Management Essentials
  {
    id: BigInt(12),
    title: "Position Sizing and Risk-Reward Ratios",
    description: "Learn proper position sizing and risk-reward calculations",
    courseId: "course6",
    thumbnail: "https://i.ytimg.com/vi/9LTRx5jHsXc/maxresdefault.jpg",
    duration: 2100, // 35 minutes
    videoUrl: "https://www.youtube.com/watch?v=9LTRx5jHsXc"
  },
  {
    id: BigInt(13),
    title: "Stop Loss Strategies",
    description: "Master different types of stop losses and when to use them",
    courseId: "course6",
    thumbnail: "https://i.ytimg.com/vi/UCZWfR_YqvY/maxresdefault.jpg",
    duration: 2400, // 40 minutes
    videoUrl: "https://www.youtube.com/watch?v=UCZWfR_YqvY"
  },

];

const timestamps: TimestampType[] = [
  // Video 1: Understanding Stock Market Basics (30 minutes total)
  {
    id: BigInt(1),
    videoId: "1",
    startTime: BigInt(0),
    endTime: BigInt(300), // 5:00
    name: "Introduction to Stock Markets"
  },
  {
    id: BigInt(2),
    videoId: "1",
    startTime: BigInt(300), // 5:00
    endTime: BigInt(600), // 10:00
    name: "What is a Stock Exchange"
  },
  {
    id: BigInt(3),
    videoId: "1",
    startTime: BigInt(600), // 10:00
    endTime: BigInt(900), // 15:00
    name: "Types of Market Participants"
  },
  {
    id: BigInt(4),
    videoId: "1",
    startTime: BigInt(900), // 15:00
    endTime: BigInt(1200), // 20:00
    name: "Trading Mechanics"
  },
  {
    id: BigInt(5),
    videoId: "1",
    startTime: BigInt(1200), // 20:00
    endTime: BigInt(1800), // 30:00
    name: "Basic Trading Terms"
  },

  // Video 2: Market Structure and Order Types (20 minutes total)
  {
    id: BigInt(6),
    videoId: "2",
    startTime: BigInt(0),
    endTime: BigInt(600), // 10:00
    name: "Introduction to Market Structure"
  },
  {
    id: BigInt(7),
    videoId: "2",
    startTime: BigInt(600), // 10:00
    endTime: BigInt(1200), // 20:00
    name: "Types of Orders"
  },


  // Video 3: Trading Psychology Fundamentals (30 minutes total)
  {
    id: BigInt(8),
    videoId: "16",
    startTime: BigInt(0),
    endTime: BigInt(300), // 5:00
    name: "Understanding Trading Psychology"
  },
  {
    id: BigInt(9),
    videoId: "16",
    startTime: BigInt(300), // 5:00
    endTime: BigInt(600), // 10:00
    name: "Types of Psychological Factors"
  },
  {
    id: BigInt(10),
    videoId: "16",
    startTime: BigInt(600), // 10:00
    endTime: BigInt(900), // 15:00
    name: "Psychological Factors in Trading"
  },


  // Video 4: Market Structure and Order Types (30 minutes total)
  {
    id: BigInt(8),
    videoId: "17",
    startTime: BigInt(1200), // 20:00
    endTime: BigInt(1800), // 30:00
    name: "Advanced Order Types"
  },
  {
    id: BigInt(9),
    videoId: "17",
    startTime: BigInt(1800), // 30:00
    endTime: BigInt(2400), // 40:00
    name: "Market Structure Best Practices"
  },


  // Video 5: Trading Psychology Fundamentals (30 minutes total)
  {
    id: BigInt(8),
    videoId: "18",
    startTime: BigInt(2400), // 40:00
    endTime: BigInt(3000), // 50:00
    name: "Advanced Psychological Factors"
  },
  {
    id: BigInt(9),
    videoId: "18",
    startTime: BigInt(3000), // 50:00
    endTime: BigInt(3600), // 60:00
    name: "Psychological Factors in Trading"
  }
];

const progress: ProgressType[] = [
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

  {
    id: BigInt(3),
    userId: "1",
    videoId: "4",
    courseId: BigInt(3)
  },

  {
    id: BigInt(3),
    userId: "2",
    videoId: "1",
    courseId: BigInt(1)
  },
];

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
    p.courseId === BigInt(courseId.replace('course', '')) // Convert 'course1' to 1 (not applicable for real id's)
  );
  const courseVideos = videos.filter(v => v.courseId === courseId);

  if (!courseVideos.length) return 0;
  return Math.round((userProgress.length / courseVideos.length) * 100);
};