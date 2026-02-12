import { useState, useEffect, useCallback, useRef } from 'react';
import type { NewsItem, NewsCategory } from '@/types/news';
import { newsService } from '@/services/newsService';

interface UseNewsOptions {
  category?: NewsCategory;
  autoRefresh?: boolean;
  refreshInterval?: number; // 毫秒
}

export function useNews(options: UseNewsOptions = {}) {
  const { category = 'all', autoRefresh = true, refreshInterval = 60 * 60 * 1000 } = options; // 默认1小时

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchNews = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);
    try {
      const data = await newsService.fetchNews(category, forceRefresh);
      setNews(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError('获取新闻失败，请稍后重试');
      console.error('Failed to fetch news:', err);
    } finally {
      setLoading(false);
    }
  }, [category]);

  // 手动刷新
  const refresh = useCallback(() => {
    return fetchNews(true);
  }, [fetchNews]);

  // 初始加载
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // 自动刷新
  useEffect(() => {
    if (autoRefresh && refreshInterval > 0) {
      intervalRef.current = setInterval(() => {
        fetchNews(true);
      }, refreshInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoRefresh, refreshInterval, fetchNews]);

  return {
    news,
    loading,
    error,
    lastUpdated,
    refresh
  };
}

// 用于获取突发新闻
export function useBreakingNews() {
  const [breakingNews, setBreakingNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBreakingNews = useCallback(async () => {
    setLoading(true);
    try {
      const data = await newsService.fetchBreakingNews();
      setBreakingNews(data);
    } catch (err) {
      console.error('Failed to fetch breaking news:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBreakingNews();
    // 每5分钟更新一次突发新闻
    const interval = setInterval(fetchBreakingNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchBreakingNews]);

  return { breakingNews, loading };
}

// 用于搜索新闻
export function useSearchNews() {
  const [results, setResults] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const data = await newsService.searchNews(query);
      setResults(data);
    } catch (err) {
      console.error('Failed to search news:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, search };
}
