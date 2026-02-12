import { useRef, useEffect, useState } from 'react';
import type { NewsItem, NewsCategory } from '@/types/news';
import { NewsCard } from './NewsCard';
import { cn } from '@/lib/utils';
import { Loader2, Newspaper } from 'lucide-react';

interface NewsGridProps {
  news: NewsItem[];
  loading?: boolean;
  category?: NewsCategory;
  className?: string;
}

export function NewsGrid({ news, loading = false, category = 'all', className }: NewsGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-id');
          if (id && entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const items = gridRef.current?.querySelectorAll('[data-id]');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [news]);

  const getCategoryTitle = (cat: NewsCategory) => {
    const titles: Record<NewsCategory, string> = {
      all: '全部新闻',
      ai: '人工智能',
      tech: '科技创新',
      finance: '财经市场',
      breaking: '突发新闻'
    };
    return titles[cat] || '新闻列表';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <Newspaper className="w-16 h-16 mb-4 opacity-50" />
        <p className="text-lg">暂无新闻</p>
        <p className="text-sm opacity-70">请稍后刷新或切换分类</p>
      </div>
    );
  }

  // 分离突发新闻和普通新闻
  const breakingNews = news.filter(n => n.isBreaking);
  const regularNews = news.filter(n => !n.isBreaking);

  return (
    <section className={cn("py-16", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {getCategoryTitle(category)}
            </h2>
            <p className="text-gray-400">
              共 {news.length} 条新闻
            </p>
          </div>
        </div>

        {/* Breaking News Section */}
        {breakingNews.length > 0 && category !== 'breaking' && (
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-red-500 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              突发新闻
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {breakingNews.slice(0, 2).map((item, index) => (
                <div
                  key={item.id}
                  data-id={item.id}
                  className={cn(
                    "transform transition-all duration-700",
                    visibleItems.has(item.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <NewsCard news={item} variant="featured" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular News Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularNews.map((item, index) => (
            <div
              key={item.id}
              data-id={item.id}
              className={cn(
                "transform transition-all duration-700",
                visibleItems.has(item.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ 
                transitionDelay: `${(index % 6) * 100}ms`,
                marginTop: index % 3 === 1 ? '2rem' : index % 3 === 2 ? '1rem' : '0'
              }}
            >
              <NewsCard news={item} variant="default" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
