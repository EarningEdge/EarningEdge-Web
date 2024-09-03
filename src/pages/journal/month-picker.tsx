import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';

import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

interface MonthListProps {
  onSelectMonth: (month: dayjs.Dayjs) => void;
}

const MonthList: React.FC<MonthListProps> = ({ onSelectMonth }) => {
  const allMonths = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
    'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
  ];

  const [months, setMonths] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    const reorderedMonths = [
      'This month',
      // ...allMonths.slice(currentMonthIndex + 1),
      ...allMonths.slice(0, currentMonthIndex).reverse(),
    ];
    setMonths(reorderedMonths);
    setSelectedMonth('This month');
  }, []);

  const handleMonthClick = (month: string) => {
    setSelectedMonth(month);
    const monthIndex = month === 'This month' ? new Date().getMonth() : allMonths.indexOf(month);
    const selectedDayjsMonth = dayjs().month(monthIndex).startOf('month');
    onSelectMonth(selectedDayjsMonth);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200; // Adjust this value as needed
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative pb-2 mt-4 bg-darkSecondary border-darkStroke border-[0.4px] mb-4 rounded-md">
      <button 
        onClick={() => scroll('left')} 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-darkSecondary p-1 rounded-full z-10"
      >
        <ArrowLeftOutlined size={20} className="text-gray-300" />
      </button>
      
      <div ref={scrollContainerRef} className="overflow-x-auto no-scrollbar px-8">
        <div className="flex gap-2 min-w-max p-2">
          {months.map((month: string) => (
            <button
              key={month}
              onClick={() => handleMonthClick(month)}
              className={`px-2 md:px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedMonth === month
                  ? ' text-white border-green-600 border-[0.4px]'
                  : 'text-gray-300 hover:text-gray-400'
              }`}
            >
              {month}
            </button>
          ))}
        </div>
      </div>
      
      <button 
        onClick={() => scroll('right')} 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-darkSecondary p-1 rounded-full z-10"
      >
        <ArrowRightOutlined size={20} className="text-gray-300" />
      </button>
    </div>
  );
};

export default MonthList;