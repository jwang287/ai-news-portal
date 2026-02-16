import { RefreshCw, Clock, Wifi, WifiOff, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCountdown } from '@/hooks/useCountdown';
import { useIpAddress } from '@/hooks/useIpAddress';

interface StatusBarProps {
  lastUpdated: Date | null;
  loading?: boolean;
  onRefresh?: () => void;
  isOnline?: boolean;
}

export function StatusBar({ lastUpdated, loading = false, onRefresh, isOnline = true }: StatusBarProps) {
  const countdownText = useCountdown(lastUpdated);
  const { ipInfo } = useIpAddress();

  const formatLastUpdated = (date: Date | null) => {
    if (!date) return '从未更新';
    return date.toLocaleString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Left: Status */}
          <div className="flex items-center gap-4">
            {/* Online Status */}
            <div className="flex items-center gap-2">
              {isOnline ? (
                <>
                  <Wifi className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500 hidden sm:inline">已连接</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-500 hidden sm:inline">离线</span>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="w-px h-4 bg-white/20" />

            {/* IP Address */}
            {ipInfo && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">IP:</span>
                <span className="text-white font-mono">{ipInfo.ip}</span>
                {(ipInfo.city || ipInfo.region) && (
                  <span className="text-gray-500 hidden md:inline">
                    ({ipInfo.region}{ipInfo.city ? ` · ${ipInfo.city}` : ''})
                  </span>
                )}
              </div>
            )}

            {/* Divider */}
            <div className="w-px h-4 bg-white/20" />

            {/* Last Updated */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">上次更新:</span>
              <span className="text-white">{formatLastUpdated(lastUpdated)}</span>
            </div>
          </div>

          {/* Right: Countdown & Refresh */}
          <div className="flex items-center gap-4">
            {/* Auto-refresh Countdown */}
            {lastUpdated && (
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                <span>{countdownText}</span>
              </div>
            )}

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={loading}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
                loading
                  ? "bg-white/10 text-gray-400 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/30"
              )}
            >
              <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
              <span className="hidden sm:inline">{loading ? '更新中...' : '立即刷新'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
