import { useState } from 'react';
import { Clock, ExternalLink, AlertCircle } from 'lucide-react';
import type { NewsItem } from '@/types/news';
import { cn } from '@/lib/utils';

interface NewsCardProps {
  news: NewsItem;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

export function NewsCard({ news, variant = 'default', className }: NewsCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (minutes < 60) {
      return `${minutes}分钟前`;
    } else if (hours < 24) {
      return `${hours}小时前`;
    } else {
      return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      ai: 'AI',
      tech: '科技',
      finance: '财经',
      breaking: '突发'
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      ai: 'bg-purple-600',
      tech: 'bg-blue-600',
      finance: 'bg-green-600',
      breaking: 'bg-red-600'
    };
    return colors[category] || 'bg-gray-600';
  };

  if (variant === 'featured') {
    return (
      <div className={cn(
        "group relative overflow-hidden rounded-2xl bg-black cursor-pointer",
        "transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl",
        className
      )}>
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={news.imageUrl}
            alt={news.title}
            className={cn(
              "w-full h-full object-cover transition-all duration-700",
              "group-hover:scale-110",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-800 animate-pulse" />
          )}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          {/* Breaking Badge */}
          {news.isBreaking && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-red-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold animate-pulse">
              <AlertCircle className="w-4 h-4" />
              突发新闻
            </div>
          )}

          {/* Category Badge */}
          <div className={cn(
            "absolute top-4 right-4 text-white px-3 py-1.5 rounded-full text-sm font-medium",
            getCategoryColor(news.category)
          )}>
            {getCategoryLabel(news.category)}
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-red-400 transition-colors">
            {news.title}
          </h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {news.summary}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-4">
              <span className="font-medium text-white">{news.source}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatDate(news.publishedAt)}
              </span>
            </div>
            <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn(
        "group flex gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer",
        "transition-all duration-300 border border-white/10 hover:border-white/20",
        className
      )}>
        {/* Image */}
        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={news.imageUrl}
            alt={news.title}
            className={cn(
              "w-full h-full object-cover transition-transform duration-500",
              "group-hover:scale-110",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-700 animate-pulse" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={cn("text-xs text-white px-2 py-0.5 rounded", getCategoryColor(news.category))}>
              {getCategoryLabel(news.category)}
            </span>
            {news.isBreaking && (
              <span className="flex items-center gap-1 text-xs text-red-500">
                <AlertCircle className="w-3 h-3" />
                突发
              </span>
            )}
          </div>
          <h4 className="text-white font-medium line-clamp-2 mb-1 group-hover:text-red-400 transition-colors">
            {news.title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>{news.source}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDate(news.publishedAt)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn(
      "group rounded-2xl overflow-hidden bg-white/5 border border-white/10",
      "hover:border-white/20 transition-all duration-500 cursor-pointer",
      "hover:shadow-xl hover:shadow-red-900/10 hover:-translate-y-1",
      className
    )}>
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={news.imageUrl}
          alt={news.title}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            "group-hover:scale-110",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        )}
        
        {/* Category Badge */}
        <div className={cn(
          "absolute top-3 left-3 text-white text-xs px-2.5 py-1 rounded-full font-medium",
          getCategoryColor(news.category)
        )}>
          {getCategoryLabel(news.category)}
        </div>

        {/* Breaking Badge */}
        {news.isBreaking && (
          <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            突发
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
          {news.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {news.summary}
        </p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <span className="text-white font-medium">{news.source}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-400 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatDate(news.publishedAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
