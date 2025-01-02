import React from 'react';
import { NewsItemType } from "../../types/data";
import { NewsCardSkeleton } from "./NewsCardSkeleton";
import { useMediaQuery } from '@mui/material';
import { NewsCard } from './NewsCard';

const DEFAULT_IMAGE = "/api/placeholder/400/300";

export const NewsGrid: React.FC<{
  news: NewsItemType[];
  loading: boolean;
  error: string | null;
}> = ({ news, loading, error }) => {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = DEFAULT_IMAGE;
  };

  if (error) {
    return (
      <div className="text-red-400 text-center py-8 bg-red-950/20 rounded-lg border border-red-900">
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  if (loading) {
    return <NewsCardSkeleton />;
  }
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1.1fr] gap-4 p-4">
      {/* First Column */}
      <div className="space-y-4">
        <NewsCard
          news={news[0]}
          imageHeight="h-64 md:h-96"
          descriptionLines="line-clamp-5"
          padding="p-6"
          onImageError={handleImageError}
        />
        <NewsCard
          news={news[1]}
          imageHeight="h-45 md:h-40"
          descriptionLines="line-clamp-4"
          padding="p-2"
          horizontalLayout={isDesktop}
          onImageError={handleImageError}
        />
      </div>

      {/* Second Column */}
      <div className="space-y-4">
        <NewsCard
          news={news[2]}
          imageHeight="h-48 md:h-65"
          descriptionLines="line-clamp-3"
          padding="p-6"
          onImageError={handleImageError}
        />
        <NewsCard
          news={news[3]}
          imageHeight="h-48 md:h-65"
          descriptionLines="line-clamp-3"
          padding="p-6"
          onImageError={handleImageError}
        />
      </div>

      {/* Third Column */}
      <div className="space-y-4">
        {[4, 5, 6].map((index) => (
          <NewsCard
            key={index}
            news={news[index]}
            imageHeight="h-30 md:h-25"
            descriptionLines="line-clamp-2"
            padding="p-1"
            smallItem={isDesktop}
            onImageError={handleImageError}
          />
        ))}
      </div>
    </div>
  );
};

