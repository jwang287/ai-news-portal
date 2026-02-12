import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import type { NewsItem } from '@/types/news';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  news: NewsItem[];
}

export function HeroSection({ news }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const featuredNews = news.filter(n => n.isBreaking).slice(0, 5);
  
  if (featuredNews.length === 0) {
    featuredNews.push(...news.slice(0, 5));
  }

  useEffect(() => {
    if (!isAutoPlaying || featuredNews.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredNews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredNews.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredNews.length) % featuredNews.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredNews.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (featuredNews.length === 0) return null;

  const currentNews = featuredNews[currentIndex];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Images */}
      {featuredNews.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "absolute inset-0 transition-all duration-1000",
            index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6">
            {/* Breaking News Badge */}
            {currentNews.isBreaking && (
              <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                <AlertCircle className="w-4 h-4" />
                突发新闻
              </div>
            )}

            {/* Category */}
            <div className="flex items-center gap-3">
              <span className={cn(
                "text-white text-sm px-3 py-1 rounded-full font-medium",
                currentNews.category === 'ai' && "bg-purple-600",
                currentNews.category === 'tech' && "bg-blue-600",
                currentNews.category === 'finance' && "bg-green-600",
                currentNews.category === 'breaking' && "bg-red-600"
              )}>
                {currentNews.category === 'ai' && '人工智能'}
                {currentNews.category === 'tech' && '科技'}
                {currentNews.category === 'finance' && '财经'}
                {currentNews.category === 'breaking' && '突发'}
              </span>
              <span className="text-gray-400 text-sm">
                {new Date(currentNews.publishedAt).toLocaleDateString('zh-CN', {
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              <span
                key={currentNews.id}
                className="block animate-in fade-in slide-in-from-bottom-4 duration-700"
              >
                {currentNews.title}
              </span>
            </h1>

            {/* Summary */}
            <p
              key={`summary-${currentNews.id}`}
              className="text-lg text-gray-300 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100"
            >
              {currentNews.summary}
            </p>

            {/* Source & Author */}
            <div
              key={`meta-${currentNews.id}`}
              className="flex items-center gap-4 text-sm text-gray-400 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200"
            >
              <span className="text-white font-medium">{currentNews.source}</span>
              <span>·</span>
              <span>{currentNews.author}</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 rounded-full"
              >
                阅读全文
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 rounded-full"
              >
                收藏新闻
              </Button>
            </div>
          </div>

          {/* Right: Navigation Cards */}
          <div className="hidden lg:block">
            <div className="space-y-4">
              {featuredNews.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "group flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-500",
                    index === currentIndex
                      ? "bg-white/20 backdrop-blur-sm border border-white/30"
                      : "bg-white/5 border border-transparent hover:bg-white/10"
                  )}
                >
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn(
                        "text-xs text-white px-2 py-0.5 rounded",
                        item.category === 'ai' && "bg-purple-600",
                        item.category === 'tech' && "bg-blue-600",
                        item.category === 'finance' && "bg-green-600",
                        item.category === 'breaking' && "bg-red-600"
                      )}>
                        {item.category === 'ai' && 'AI'}
                        {item.category === 'tech' && '科技'}
                        {item.category === 'finance' && '财经'}
                        {item.category === 'breaking' && '突发'}
                      </span>
                      {item.isBreaking && (
                        <span className="text-xs text-red-400">突发</span>
                      )}
                    </div>
                    <h4 className={cn(
                      "text-sm font-medium line-clamp-2 transition-colors",
                      index === currentIndex ? "text-white" : "text-gray-400 group-hover:text-gray-200"
                    )}>
                      {item.title}
                    </h4>
                  </div>
                  {index === currentIndex && (
                    <div className="w-1 h-12 bg-red-500 rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between mt-12">
          {/* Slide Indicators */}
          <div className="flex items-center gap-2">
            {featuredNews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  index === currentIndex ? "w-8 bg-red-500" : "w-2 bg-white/30 hover:bg-white/50"
                )}
              />
            ))}
          </div>

          {/* Arrow Navigation */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrev}
              className="border-white/30 text-white hover:bg-white/10 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="border-white/30 text-white hover:bg-white/10 rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {isAutoPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div
            key={currentIndex}
            className="h-full bg-red-500 animate-progress"
            style={{ animationDuration: '5s' }}
          />
        </div>
      )}
    </section>
  );
}
