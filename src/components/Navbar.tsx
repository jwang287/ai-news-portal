import { useState, useEffect } from 'react';
import { Menu, X, Search, RefreshCw, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { NewsCategory } from '@/types/news';

interface NavbarProps {
  selectedCategory: NewsCategory;
  onCategoryChange: (category: NewsCategory) => void;
  onRefresh: () => void;
  onSearch: (query: string) => void;
  loading?: boolean;
  lastUpdated?: Date | null;
}

const categories: { value: NewsCategory; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'breaking', label: '突发' },
  { value: 'ai', label: 'AI' },
  { value: 'tech', label: '科技' },
  { value: 'finance', label: '财经' }
];

export function Navbar({
  selectedCategory,
  onCategoryChange,
  onRefresh,
  onSearch,
  loading = false,
  lastUpdated
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setIsSearchOpen(false);
  };

  const formatLastUpdated = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-xl shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              NewsHub
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => onCategoryChange(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat.value
                    ? 'bg-red-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className={`hidden md:flex items-center transition-all duration-300 ${isSearchOpen ? 'w-64' : 'w-auto'}`}>
              {isSearchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="搜索新闻..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(false)}
                    className="text-white hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="text-white hover:bg-white/10"
                >
                  <Search className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* Refresh Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onRefresh}
              disabled={loading}
              className="text-white hover:bg-white/10 relative group"
              title={lastUpdated ? `上次更新: ${formatLastUpdated(lastUpdated)}` : '刷新'}
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:bg-white/10"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <Input
                type="text"
                placeholder="搜索新闻..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 w-full"
              />
            </form>

            {/* Mobile Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => {
                    onCategoryChange(cat.value);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat.value
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
