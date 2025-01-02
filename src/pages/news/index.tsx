import React, { useState, useEffect, useRef } from "react";
import CustomLayout from "../../components/layout/custom-layout/CustomLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";
import { NewsGrid } from "./NewsGrid";
import { NewsItemType, NewsResponse, NewsCategory } from "../../types/data";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./Pagination";
import { useMediaQuery } from "@mui/material";
import AlertModal from "./AlertModel";

const CATEGORIES: NewsCategory[] = [
  "NSE",
  "BSE",
  "Equity",
  "Derivatives",
  "Commodities",
  "Forex",
  "ETFs",
  "IPO",
  "Mutual Funds",
];

const fetchNewsData = async (
  category: NewsCategory,
  searchQuery: string = "",
  cursor: string | null = null
): Promise<NewsResponse> => {
  const query = searchQuery ? searchQuery : category;
  const baseUrl = "https://google-news-api1.p.rapidapi.com/search";
  const ITEMS_PER_PAGE = 10;

  let url = `${baseUrl}?language=EN&q=${query}&limit=${ITEMS_PER_PAGE}&sort=date:desc`;

  // Add cursor if available for pagination
  if (cursor) url += `&cursor=${cursor}`;

  const response = await fetch(url, {
    headers: {
      "x-rapidapi-host": "google-news-api1.p.rapidapi.com",
      "x-rapidapi-key": import.meta.env.VITE_NEWS_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  return response.json();
};

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(5);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [activeCategory, setActiveCategory] = useState<NewsCategory>("NSE");
  const [cursors, setCursors] = useState<{ [key: number]: string }>({});
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const fetchNews = async (
    category: NewsCategory,
    search: string = "",
    page: number = 1
  ) => {
    setIsAlertOpen(false);
    setLoading(true);
    setError(null);
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });

      const cursor = cursors[page];
      const data = await fetchNewsData(category, search, cursor);

      const validData = data.news.news
        .filter((item: any) => item.title !== "MSN") // Invalid data
        .slice(0, 7);

      if (validData.length === 0) {
        setIsAlertOpen(true);
        return
      }

      setNews(validData);

      if (data.news.next_cursor) {
        setCursors((prev) => ({
          ...prev,
          [page + 1]: data.news.next_cursor || "1",
        }));
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setCursors({});
    fetchNews(activeCategory, searchQuery, 1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    // If we're moving forward and don't have the cursor for the next page, fetch it
    if (page > currentPage && !cursors[page] && !loading) {
      fetchNews(activeCategory, searchQuery, currentPage);
    } else {
      setCurrentPage(page);
      fetchNews(activeCategory, searchQuery, page);
    }
  };

  const handleCategoryChange = (category: NewsCategory) => {
    setActiveCategory(category);
    setSearchQuery("");
    setCurrentPage(1);
    setCursors({});
    fetchNews(category, "", 1);
  };

  useEffect(() => {
    fetchNews("NSE");
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <CustomLayout>
      <AlertModal isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} />
      <div className="min-h-screen bg-gradient-to-b text-slate-100 p-6 pt-0">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text mb-4 md:mb-0">
              Top Financial News
            </h1>

            <form
              onSubmit={handleSearch}
              className="flex w-full md:w-auto gap-2"
            >
              <input
                type="search"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                className="w-full md:w-64 px-4 py-2 rounded-lg bg-black/20 border border-slate-800 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="p-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>
          <Tabs
            value={activeCategory}
            onValueChange={(value) => handleCategoryChange(value as NewsCategory)}
            className="relative"
          >
            <div className="flex items-center justify-center gap-2">
              {!isDesktop && (
                <button
                  onClick={() => scroll('left')}
                  className="p-2 rounded-full bg-slate-800 text-slate-200 hover:bg-slate-700"
                >
                  <ChevronLeft size={20} />
                </button>
              )}


              <div
                ref={scrollRef}
                className="overflow-x-auto scrollbar-hide"
              >
                <TabsList
                  style={{ backgroundColor: '#111827' }}
                  className="flex bg-slate-100 whitespace-nowrap h-auto bg-black/40 p-2 rounded-xl border border-slate-800 backdrop-blur-sm gap-4"
                >
                  {CATEGORIES.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300 text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {!isDesktop && (
                <button
                  onClick={() => scroll('right')}
                  className="p-2 rounded-full bg-slate-800 text-slate-200 hover:bg-slate-700"
                >
                  <ChevronRight size={20} />
                </button>
              )}

            </div>

            {CATEGORIES.map((category) => (
              <TabsContent key={category} value={category} className="mt-6">
                <NewsGrid news={news} loading={loading} error={error} />
              </TabsContent>
            ))}
          </Tabs>

          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={
                    currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={
                    currentPage >= totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </CustomLayout>
  );
};

export default News;
