import { ExternalLink } from "lucide-react";
import { NewsItemType } from "../../types/data";
import { Card, CardContent } from "./Cards";
import moment from "moment";

interface NewsCardProps {
  news: NewsItemType;
  imageHeight: string;
  descriptionLines: string;
  padding: string;
  horizontalLayout?: boolean;
  smallItem?: boolean;
  onImageError: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  news,
  imageHeight,
  descriptionLines,
  padding,
  horizontalLayout,
  smallItem,
  onImageError
}) => {
  return (
    <Card className=" bg-[#262633] border-slate-800 hover:bg-slate-900/60 transition-all duration-300 backdrop-blur-sm">
      <CardContent className={padding}>
        <div className="flex pt-2 md:pt-3 justify-between items-start gap-2">
          <div className={smallItem ? 'space-y-1' : 'space-y-2'}>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 transition-colors cursor-pointer">
              {news.source}
            </span>
            <h3 className={`text-base md:text-lg font-semibold text-slate-100 ${smallItem ? 'line-clamp-1' : 'line-clamp-2'} leading-tight`}>
              {news.title}
            </h3>
          </div>
          <a
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 transition-colors p-2 rounded-full hover:bg-indigo-500/10"
          >
            <ExternalLink className="h-4 w-4 md:h-5 md:w-5" />
          </a>
        </div>

        <div className={`flex items-center gap-0 text-sm text-slate-400 ${smallItem ? 'mt-0 md:mt-0' : 'mt-2 md:mt-3'} `}>
          <time dateTime={news.date} className="font-medium text-xs md:text-sm">
            {moment(news.date).fromNow()}
          </time>
        </div>

        {horizontalLayout ? (
          news.props.image && (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className={`relative mt-2 md:mt-4 overflow-hidden rounded-xl h-70 md:h-40 md:w-90`}>
                <img
                  src={news.props.image || 'https://www.bblf.bg/img/default-news-image.png'}
                  alt={news.title}
                  onError={onImageError}
                  className="object-cover w-[60rem] h-full transform hover:scale-105 transition-transform duration-500"
                />
              </div>


              <p className={`text-slate-300 mt-2 md:mt-4 ${descriptionLines} text-sm md:text-base leading-relaxed`}>
                {news.description.slice(0, 100)}
              </p>
            </div>

          )) : (
          news.props.image && (
            <>
              <div className={`relative mt-2 md:mt-4 overflow-hidden rounded-xl ${imageHeight}`}>
                <img
                  src={news.props.image}
                  alt={news.title}
                  onError={onImageError}
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className={`text-slate-300 mt-2 md:mt-4 ${descriptionLines} text-sm md:text-base leading-relaxed`}>
                {news.description}
              </p>
            </>
          )
        )}
      </CardContent>
    </Card>
  );
};