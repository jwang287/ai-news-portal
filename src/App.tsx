import { useState, useEffect, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { NewsGrid } from '@/components/NewsGrid';
import { StatusBar } from '@/components/StatusBar';
import { Footer } from '@/components/Footer';
import { useNews, useSearchNews } from '@/hooks/useNews';
import type { NewsCategory, NewsItem } from '@/types/news';
import { Toaster, toast } from 'sonner';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all');
  const [displayedNews, setDisplayedNews] = useState<NewsItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const { news, loading, error, lastUpdated, refresh } = useNews({
    category: selectedCategory,
    autoRefresh: true,
    refreshInterval: 60 * 60 * 1000 // 1小时自动刷新
  });

  const { results: searchResults, loading: searchLoading, search } = useSearchNews();

  // 监听网络状态
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('网络已连接', { description: '已恢复在线状态' });
    };
    const handleOffline = () => {
      setIsOnline(false);
      toast.error('网络已断开', { description: '请检查网络连接' });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 更新显示的新闻
  useEffect(() => {
    if (isSearching) {
      setDisplayedNews(searchResults);
    } else {
      setDisplayedNews(news);
    }
  }, [news, searchResults, isSearching]);

  // 错误提示
  useEffect(() => {
    if (error) {
      toast.error('获取新闻失败', { description: error });
    }
  }, [error]);

  // 手动刷新
  const handleRefresh = useCallback(async () => {
    toast.promise(refresh(), {
      loading: '正在刷新新闻...',
      success: '新闻已更新',
      error: '刷新失败，请重试'
    });
  }, [refresh]);

  // 分类切换
  const handleCategoryChange = useCallback((category: NewsCategory) => {
    setSelectedCategory(category);
    setIsSearching(false);
    toast.info(`已切换到: ${getCategoryLabel(category)}`);
  }, []);

  // 搜索
  const handleSearch = useCallback((query: string) => {
    if (query.trim()) {
      setIsSearching(true);
      search(query);
      toast.info(`搜索: ${query}`);
    } else {
      setIsSearching(false);
    }
  }, [search]);

  const getCategoryLabel = (category: NewsCategory): string => {
    const labels: Record<NewsCategory, string> = {
      all: '全部新闻',
      ai: '人工智能',
      tech: '科技创新',
      finance: '财经市场',
      breaking: '突发新闻'
    };
    return labels[category];
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Toaster 
        position="top-right" 
        richColors 
        closeButton
        toastOptions={{
          style: {
            background: '#1a1a1a',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff'
          }
        }}
      />

      {/* Navigation */}
      <Navbar
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        onRefresh={handleRefresh}
        onSearch={handleSearch}
        loading={loading}
        lastUpdated={lastUpdated}
      />

      {/* Hero Section - 仅在非搜索模式下显示 */}
      {!isSearching && (
        <HeroSection news={news} />
      )}

      {/* News Grid */}
      <main className={isSearching ? 'pt-24' : ''}>
        <NewsGrid
          news={displayedNews}
          loading={loading || searchLoading}
          category={selectedCategory}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Status Bar */}
      <StatusBar
        lastUpdated={lastUpdated}
        loading={loading}
        onRefresh={handleRefresh}
        isOnline={isOnline}
      />

      {/* Bottom padding for status bar */}
      <div className="h-12" />
    </div>
  );
}

export default App;
