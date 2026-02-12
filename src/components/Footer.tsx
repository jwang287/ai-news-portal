import { Github, Twitter, Mail, Rss, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    categories: [
      { label: '人工智能', href: '#' },
      { label: '科技创新', href: '#' },
      { label: '财经市场', href: '#' },
      { label: '突发新闻', href: '#' }
    ],
    resources: [
      { label: '关于我们', href: '#' },
      { label: '联系方式', href: '#' },
      { label: '隐私政策', href: '#' },
      { label: '使用条款', href: '#' }
    ],
    social: [
      { label: 'GitHub', href: 'https://github.com', icon: Github },
      { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
      { label: '邮件', href: 'mailto:contact@newshub.com', icon: Mail },
      { label: 'RSS', href: '#', icon: Rss }
    ]
  };

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <Rss className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">NewsHub</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              聚合全球最新AI、科技、财经新闻，为您提供实时、准确的信息服务。
            </p>
            <div className="flex items-center gap-3">
              {footerLinks.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300"
                  title={item.label}
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">新闻分类</h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">资源链接</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">订阅新闻信</h3>
            <p className="text-gray-400 text-sm mb-4">
              订阅我们的新闻信，获取每日精选新闻推送。
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="输入您的邮箱"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-colors text-sm"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors text-sm"
              >
                订阅
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              &copy; {currentYear} NewsHub. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in China
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
