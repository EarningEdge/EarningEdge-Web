import { Card, CardContent } from "./Cards";
import { Skeleton } from "./Skeleton";

export const NewsCardSkeleton: React.FC = () => (
  <Card className="bg-black/40 border-slate-800">
    <CardContent className="p-6 pt-5 ">
      <div className="space-y-4">
        <Skeleton className="h-4 w-24 bg-slate-800" />
        <Skeleton className="h-6 w-3/4 bg-slate-800" />
        <div className="flex gap-2">
          <Skeleton className="h-4 w-24 bg-slate-800" />
        </div>
        <Skeleton className="h-48 w-full bg-slate-800" />
        <Skeleton className="h-10 w-full bg-slate-800" />
      </div>
    </CardContent>
  </Card>
);