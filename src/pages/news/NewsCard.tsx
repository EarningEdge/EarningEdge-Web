import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "./Cards";
import { NewsItemType } from "../../types/data";

export const NewsCard: React.FC<{ item: NewsItemType }> = ({ item }) => {
  return (
    <Card className="bg-black/40 border-slate-800 hover:bg-slate-900/60 transition-all duration-300 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex pt-5 justify-between items-start gap-4">
          <div className="space-y-2">

            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 transition-colors cursor-pointer">
              {item.source}
            </span>
            <h3 className="text-lg font-semibold text-slate-100 line-clamp-2 leading-tight">
              {item.title}
            </h3>
          </div>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 transition-colors p-2 rounded-full hover:bg-indigo-500/10"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-400 mt-3">
          <time dateTime={item.date} className="font-medium">
            {item.date}
          </time>
        </div>

        {item.props.image && (
          <div className="relative aspect-video mt-4 overflow-hidden rounded-xl">
            <img
              src={item.props.image}
              alt={item.title}
              className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <p className="text-slate-300 mt-4 line-clamp-3 leading-relaxed">
          {item.description}
        </p>
      </CardContent>
    </Card>
  );
};