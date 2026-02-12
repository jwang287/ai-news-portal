import type { NewsItem, NewsCategory } from '@/types/news';

// 模拟新闻数据 - 实际项目中可以替换为真实的RSS API
const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'OpenAI发布GPT-5：多模态能力实现质的飞跃',
    summary: 'OpenAI今日正式发布GPT-5模型，在推理能力、代码生成和多模态理解方面实现重大突破，支持更长的上下文窗口。',
    category: 'ai',
    author: '张明',
    source: 'AI前沿',
    publishedAt: new Date().toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    url: '#',
    isBreaking: true
  },
  {
    id: '2',
    title: '全球股市大涨：科技股领涨纳斯达克创新高',
    summary: '受美联储降息预期影响，全球股市今日普遍上涨，纳斯达克指数创下历史新高，苹果、微软等科技巨头股价大涨。',
    category: 'finance',
    author: '李华',
    source: '财经日报',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    url: '#',
    isBreaking: true
  },
  {
    id: '3',
    title: '量子计算突破：谷歌实现1000量子比特处理器',
    summary: '谷歌量子AI团队宣布成功研发出1000量子比特处理器，量子纠错能力大幅提升，商业化应用指日可待。',
    category: 'tech',
    author: '王强',
    source: '科技周刊',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    url: '#'
  },
  {
    id: '4',
    title: '突发：国际气候峰会达成历史性协议',
    summary: '经过两周激烈谈判，各国代表终于在减排目标和气候资金方面达成共识，承诺2030年前实现碳排放峰值。',
    category: 'breaking',
    author: '陈静',
    source: '国际新闻',
    publishedAt: new Date(Date.now() - 1800000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800&q=80',
    url: '#',
    isBreaking: true
  },
  {
    id: '5',
    title: '苹果Vision Pro 2发布：更轻更便宜的MR头显',
    summary: '苹果发布第二代Vision Pro，重量减轻40%，价格降至2999美元起，支持更多应用场景和开发者生态。',
    category: 'tech',
    author: '刘洋',
    source: '数码时代',
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80',
    url: '#'
  },
  {
    id: '6',
    title: '比特币突破10万美元：加密货币市场全面复苏',
    summary: '比特币价格首次突破10万美元大关，以太坊、Solana等主流加密货币跟随上涨，市场情绪极度乐观。',
    category: 'finance',
    author: '赵敏',
    source: '区块链观察',
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80',
    url: '#'
  },
  {
    id: '7',
    title: 'Claude 4发布：Anthropic推出新一代AI助手',
    summary: 'Anthropic发布Claude 4，在代码理解、数学推理和长文本处理方面表现卓越，上下文窗口扩展至50万token。',
    category: 'ai',
    author: '孙伟',
    source: 'AI日报',
    publishedAt: new Date(Date.now() - 21600000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
    url: '#'
  },
  {
    id: '8',
    title: 'SpaceX星舰成功着陆：火星殖民计划迈出关键一步',
    summary: 'SpaceX星舰原型机首次完成轨道飞行并成功软着陆，马斯克表示火星殖民计划将提前至2028年启动。',
    category: 'tech',
    author: '周磊',
    source: '航天新闻',
    publishedAt: new Date(Date.now() - 25200000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&q=80',
    url: '#'
  },
  {
    id: '9',
    title: '央行宣布降息25个基点：刺激经济增长',
    summary: '为应对经济下行压力，央行宣布下调基准利率25个基点，专家预测将有效降低融资成本，提振市场信心。',
    category: 'finance',
    author: '吴芳',
    source: '金融时报',
    publishedAt: new Date(Date.now() - 28800000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80',
    url: '#'
  },
  {
    id: '10',
    title: '突发：重大网络安全漏洞影响全球数百万设备',
    summary: '安全研究人员发现名为"零日危机"的严重漏洞，影响全球主流操作系统，建议用户立即更新补丁。',
    category: 'breaking',
    author: '郑涛',
    source: '安全周刊',
    publishedAt: new Date(Date.now() - 900000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    url: '#',
    isBreaking: true
  },
  {
    id: '11',
    title: 'Meta发布Llama 4：开源大模型新标杆',
    summary: 'Meta发布Llama 4系列开源大模型，性能超越GPT-4，支持多语言和代码生成，免费供商业使用。',
    category: 'ai',
    author: '钱进',
    source: '开源中国',
    publishedAt: new Date(Date.now() - 32400000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&q=80',
    url: '#'
  },
  {
    id: '12',
    title: '特斯拉FSD V13上线：自动驾驶能力大幅提升',
    summary: '特斯拉推送FSD V13更新，城市街道自动驾驶能力显著改善，马斯克称已达到L4级别水平。',
    category: 'tech',
    author: '冯刚',
    source: '汽车科技',
    publishedAt: new Date(Date.now() - 36000000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
    url: '#'
  }
];

class NewsService {
  private static instance: NewsService;
  private cache: NewsItem[] = [];
  private lastFetchTime: Date | null = null;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

  private constructor() {}

  static getInstance(): NewsService {
    if (!NewsService.instance) {
      NewsService.instance = new NewsService();
    }
    return NewsService.instance;
  }

  // 获取新闻列表
  async fetchNews(category?: NewsCategory, forceRefresh = false): Promise<NewsItem[]> {
    // 检查缓存
    if (!forceRefresh && this.cache.length > 0 && this.lastFetchTime) {
      const now = new Date();
      const cacheAge = now.getTime() - this.lastFetchTime.getTime();
      if (cacheAge < this.CACHE_DURATION) {
        return this.filterByCategory(this.cache, category);
      }
    }

    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 800));

    // 实际项目中，这里应该调用真实的RSS API或新闻API
    // 例如: RSSHub, NewsAPI, GNews等
    this.cache = [...MOCK_NEWS];
    this.lastFetchTime = new Date();

    return this.filterByCategory(this.cache, category);
  }

  // 根据分类过滤
  private filterByCategory(news: NewsItem[], category?: NewsCategory): NewsItem[] {
    if (!category || category === 'all') {
      return news;
    }
    return news.filter(item => item.category === category);
  }

  // 获取突发新闻
  async fetchBreakingNews(): Promise<NewsItem[]> {
    const allNews = await this.fetchNews();
    return allNews.filter(item => item.isBreaking);
  }

  // 获取单条新闻
  async getNewsById(id: string): Promise<NewsItem | null> {
    const allNews = await this.fetchNews();
    return allNews.find(item => item.id === id) || null;
  }

  // 搜索新闻
  async searchNews(query: string): Promise<NewsItem[]> {
    const allNews = await this.fetchNews();
    const lowerQuery = query.toLowerCase();
    return allNews.filter(item =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.summary.toLowerCase().includes(lowerQuery)
    );
  }

  // 获取最后更新时间
  getLastUpdated(): Date | null {
    return this.lastFetchTime;
  }

  // 清除缓存
  clearCache(): void {
    this.cache = [];
    this.lastFetchTime = null;
  }
}

export const newsService = NewsService.getInstance();
