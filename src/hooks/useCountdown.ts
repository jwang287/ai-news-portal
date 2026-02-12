import { useState, useEffect, useCallback } from 'react';

export function useCountdown(targetDate: Date | null) {
  const [timeLeft, setTimeLeft] = useState<string>('');

  const calculateTimeLeft = useCallback(() => {
    if (!targetDate) return '';
    
    const now = new Date();
    const diff = targetDate.getTime() + 60 * 60 * 1000 - now.getTime(); // 假设下次更新是1小时后
    
    if (diff <= 0) {
      return '即将更新';
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (hours > 0) {
      return `${hours}小时${minutes}分钟后更新`;
    }
    return `${minutes}分${seconds}秒后更新`;
  }, [targetDate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return timeLeft;
}
