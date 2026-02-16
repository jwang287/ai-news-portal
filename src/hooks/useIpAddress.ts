import { useState, useEffect } from 'react';

interface IpInfo {
  ip: string;
  city?: string;
  country?: string;
}

export function useIpAddress() {
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIp = async () => {
      try {
        // 使用 ipapi.co 获取IP信息
        const response = await fetch('https://ipapi.co/json/');
        if (response.ok) {
          const data = await response.json();
          setIpInfo({
            ip: data.ip,
            city: data.city,
            country: data.country_name
          });
        }
      } catch (error) {
        console.error('Failed to fetch IP:', error);
        // 备用方案：只获取IP
        try {
          const response = await fetch('https://api.ipify.org?format=json');
          if (response.ok) {
            const data = await response.json();
            setIpInfo({ ip: data.ip });
          }
        } catch {
          setIpInfo({ ip: '未知' });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchIp();
  }, []);

  return { ipInfo, loading };
}
