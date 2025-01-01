import { NewsItemType } from "../../types/data";
import { NewsCard } from "./NewsCard";
import { NewsCardSkeleton } from "./NewsCardSkeleton";

export const NewsGrid: React.FC<{
  news: NewsItemType[];
  loading: boolean;
  error: string | null;
}> = ({ news, loading, error }) => {
  if (error) {
    return (
      <div className="text-red-400 text-center py-8 bg-red-950/20 rounded-lg border border-red-900">
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading
        ? Array.from({ length: 6 }).map((_, idx) => (
          <NewsCardSkeleton key={idx} />
        ))
        : news.map((item, idx) => (
          <NewsCard key={`${item.title}-${idx}`} item={item} />
        ))}
    </div>
  );
};