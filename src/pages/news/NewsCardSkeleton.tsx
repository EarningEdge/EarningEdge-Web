import React from 'react';
import { Card, CardContent } from "./Cards";

const SkeletonCard: React.FC<{
  imageHeight: string;
  descriptionLines: number;
  padding: string;
}> = ({ imageHeight, descriptionLines, padding }) => {
  return (
    <Card style={{ backgroundColor: '#111827' }} className="bg-black/40 border-slate-800 backdrop-blur-sm">
      <CardContent className={padding}>
        <div className="flex pt-2 md:pt-5 justify-between items-start gap-4">
          <div className="space-y-2 w-full">
            <div className="w-20 h-5 bg-slate-700/50 animate-pulse rounded-full" />
            <div className="w-full h-6 bg-slate-700/50 animate-pulse rounded-lg" />
            <div className="w-3/4 h-6 bg-slate-700/50 animate-pulse rounded-lg" />
          </div>
          <div className="w-8 h-8 bg-slate-700/50 animate-pulse rounded-full" />
        </div>

        <div className="mt-2 md:mt-3">
          <div className="w-32 h-4 bg-slate-700/50 animate-pulse rounded-lg" />
        </div>

        <div className={`mt-2 md:mt-4 ${imageHeight} bg-slate-700/50 animate-pulse rounded-xl`} />

        {[...Array(descriptionLines)].map((_, i) => (
          <div
            key={i}
            className={`w-full h-4 bg-slate-700/50 animate-pulse rounded-lg mt-2 ${i === descriptionLines - 1 ? 'w-3/4' : ''
              }`}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export const NewsCardSkeleton: React.FC = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1.1fr] gap-4 p-4">
      {/* First Column */}
      <div className="space-y-4">
        <SkeletonCard
          imageHeight="h-64 md:h-96"
          descriptionLines={5}
          padding="p-6"
        />
        <SkeletonCard
          imageHeight="h-48 md:h-64"
          descriptionLines={4}
          padding="p-6"
        />
      </div>

      {/* Second Column */}
      <div className="space-y-4">
        <SkeletonCard
          imageHeight="h-48 md:h-64"
          descriptionLines={3}
          padding="p-6"
        />
        <SkeletonCard
          imageHeight="h-48 md:h-64"
          descriptionLines={3}
          padding="p-6"
        />
      </div>

      {/* Third Column */}
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <SkeletonCard
            key={index}
            imageHeight="h-40"
            descriptionLines={2}
            padding="p-4"
          />
        ))}
      </div>
    </div>
  );
};