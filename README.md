# NewsHub - 新闻聚合网站

一个简洁优美的新闻聚合网站，汇集AI、科技、财经和重大突发新闻。

## 功能特性

- 📰 **多分类新闻**: AI、科技、财经、突发新闻
- 🔄 **自动更新**: 每小时自动刷新新闻
- 👆 **手动刷新**: 一键手动更新新闻
- 🔍 **搜索功能**: 快速搜索感兴趣的新闻
- 📱 **响应式设计**: 完美适配桌面和移动设备
- 🌐 **中文显示**: 完整的中文界面
- ⚡ **实时状态**: 显示网络状态和最后更新时间
- 🔔 **Toast通知**: 友好的操作反馈

## 技术栈

- React 18 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide Icons

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 部署到 Cloudflare Pages

### 1. 创建 Cloudflare Pages 项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 进入 **Pages** 页面
3. 点击 **Create a project**
4. 选择 **Connect to Git**

### 2. 配置 GitHub Secrets

在 GitHub 仓库的 **Settings > Secrets and variables > Actions** 中添加以下 secrets:

- `CLOUDFLARE_API_TOKEN`: Cloudflare API Token
  - 在 Cloudflare Dashboard > My Profile > API Tokens 创建
  - 权限: `Cloudflare Pages:Edit`
  
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare Account ID
  - 在 Cloudflare Dashboard 右侧边栏查看
  
- `CLOUDFLARE_PROJECT_NAME`: Cloudflare Pages 项目名称

### 3. 自动部署

每次推送到 `main` 分支时，GitHub Actions 会自动构建并部署到 Cloudflare Pages。

### 4. 手动触发

也可以在 GitHub Actions 页面手动触发部署工作流。

## 项目结构

```
├── src/
│   ├── components/     # UI组件
│   ├── hooks/          # 自定义Hooks
│   ├── services/       # 数据服务
│   ├── types/          # TypeScript类型
│   ├── App.tsx         # 主应用
│   └── main.tsx        # 入口文件
├── .github/workflows/  # GitHub Actions
├── public/             # 静态资源
└── dist/               # 构建输出
```

## 自定义配置

### 修改自动刷新间隔

在 `src/App.tsx` 中修改 `refreshInterval`:

```typescript
const { news, loading, error, lastUpdated, refresh } = useNews({
  category: selectedCategory,
  autoRefresh: true,
  refreshInterval: 60 * 60 * 1000 // 1小时 = 3600000毫秒
});
```

### 添加真实新闻API

在 `src/services/newsService.ts` 中替换 `fetchNews` 方法，接入真实的RSS API或新闻API:

```typescript
async fetchNews(category?: NewsCategory, forceRefresh = false): Promise<NewsItem[]> {
  // 调用真实API
  const response = await fetch(`https://api.example.com/news?category=${category}`);
  return response.json();
}
```

## 许可证

MIT License
