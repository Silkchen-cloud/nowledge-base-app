const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');
const cron = require('node-cron');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-vercel-app.vercel.app', 'https://your-vercel-app.vercel.app/']
    : true
}));
app.use(express.json());

// 数据存储路径
const DATA_FILE = path.join(__dirname, 'data', 'ai_news.json');

// 确保数据目录存在
fs.ensureDirSync(path.dirname(DATA_FILE));

// 模拟AI新闻数据源
const newsSources = [
  {
    name: 'OpenAI Blog',
    url: 'https://openai.com/blog',
    category: '产品发布'
  },
  {
    name: 'Google AI Blog',
    url: 'https://ai.google.dev',
    category: '技术突破'
  },
  {
    name: 'Microsoft AI',
    url: 'https://azure.microsoft.com/en-us/solutions/ai',
    category: '产品发布'
  },
  {
    name: 'TechCrunch AI',
    url: 'https://techcrunch.com/tag/artificial-intelligence',
    category: '投资动态'
  },
  {
    name: 'Nature AI',
    url: 'https://www.nature.com/subjects/artificial-intelligence',
    category: '应用案例'
  }
];

// 生成模拟新闻数据
const generateMockNews = () => {
  const news = [];
  const categories = ['产品发布', '技术突破', '投资动态', '应用案例', '政策法规', '研究报告', '专家观点'];
  const companies = ['OpenAI', 'Google', 'Microsoft', 'Meta', 'Apple', 'Amazon', 'NVIDIA', 'AMD', 'Intel', 'Tesla'];
  const sources = ['官方博客', '技术媒体', '学术期刊', '行业报告', '新闻网站'];
  const experts = ['李开复', '吴恩达', 'Geoffrey Hinton', 'Yann LeCun', 'Andrew Ng', '李飞飞', '张亚勤', '周志华'];
  
  // 确保每个分类都有足够的文章
  const articlesPerCategory = Math.ceil(50 / categories.length);
  
  categories.forEach((category, categoryIndex) => {
    for (let i = 0; i < articlesPerCategory; i++) {
      const company = companies[Math.floor(Math.random() * companies.length)];
      const source = sources[Math.floor(Math.random() * sources.length)];
      const expert = experts[Math.floor(Math.random() * experts.length)];
      
      let title, content, summary;
      
      if (category === '专家观点') {
        const expertTitles = [
          `${expert}：AI发展将重塑未来工作模式`,
          `${expert}谈AI伦理：我们需要负责任的人工智能`,
          `${expert}预测：AI将在5年内实现通用人工智能`,
          `${expert}观点：AI教育应该从小开始`,
          `${expert}分析：AI对就业市场的影响`,
          `${expert}建议：如何应对AI时代的挑战`,
          `${expert}展望：AI在医疗领域的应用前景`,
          `${expert}解读：大语言模型的技术突破`,
          `${expert}观点：AI安全的重要性`,
          `${expert}预测：AI芯片市场的发展趋势`
        ];
        
        title = expertTitles[Math.floor(Math.random() * expertTitles.length)];
        content = `${title}的详细观点。${expert}认为，人工智能技术正在快速发展，将对各行各业产生深远影响。我们需要在推动技术创新的同时，也要关注AI的伦理、安全和社会影响问题。未来，AI将成为人类最重要的技术工具之一。`;
        summary = `${expert}关于AI发展的最新观点`;
      } else {
        const titles = [
          `${company}发布新一代AI模型`,
          `${company}在AI领域取得重大突破`,
          `${company}获得新一轮AI投资`,
          `${company}AI技术应用于医疗诊断`,
          `${company}推出AI开发平台`,
          `${company}AI芯片性能提升50%`,
          `${company}AI助手功能全面升级`,
          `${company}AI安全技术获得认证`,
          `${company}AI在教育领域的应用`,
          `${company}AI驱动的自动驾驶技术`
        ];
        
        title = titles[Math.floor(Math.random() * titles.length)];
        content = `${title}的详细内容。${company}在人工智能领域持续创新，为行业发展带来新的机遇和挑战。该技术预计将在未来几个月内正式发布，并将在多个行业中得到广泛应用。`;
        summary = `${title} - ${company}在AI领域的最新进展`;
      }
      
      const hoursAgo = Math.floor(Math.random() * 168); // 一周内
      
      news.push({
        id: `news_${Date.now()}_${categoryIndex}_${i}`,
        title: title,
        content: content,
        source: category === '专家观点' ? `${expert} 专家观点` : `${company} ${source}`,
        url: `https://example.com/news/${categoryIndex}_${i}`,
        category: category,
        publishTime: moment().subtract(hoursAgo, 'hours').format('YYYY-MM-DD HH:mm'),
        summary: summary
      });
    }
  });
  
  // 随机打乱数组并限制为50条
  return news.sort(() => Math.random() - 0.5).slice(0, 50);
};

// 抓取新闻数据
const fetchNewsData = async () => {
  try {
    console.log('开始抓取AI新闻数据...');
    
    // 这里使用模拟数据，实际项目中可以替换为真实的网页抓取
    const news = generateMockNews();
    
    // 保存到文件
    await fs.writeJson(DATA_FILE, {
      lastUpdate: moment().format('YYYY-MM-DD HH:mm:ss'),
      totalCount: news.length,
      news: news
    });
    
    console.log(`成功抓取 ${news.length} 条新闻数据`);
    
    // 打印分类统计
    const categoryStats = {};
    news.forEach(item => {
      categoryStats[item.category] = (categoryStats[item.category] || 0) + 1;
    });
    console.log('分类统计:', categoryStats);
    
    return news;
  } catch (error) {
    console.error('抓取新闻数据失败:', error);
    return [];
  }
};

// 获取新闻数据
const getNewsData = async () => {
  try {
    if (await fs.pathExists(DATA_FILE)) {
      const data = await fs.readJson(DATA_FILE);
      return data.news || [];
    }
    return [];
  } catch (error) {
    console.error('读取新闻数据失败:', error);
    return [];
  }
};

// 健康检查接口
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API路由
app.get('/api/news', async (req, res) => {
  try {
    const news = await getNewsData();
    res.json({
      success: true,
      data: news,
      total: news.length,
      lastUpdate: moment().format('YYYY-MM-DD HH:mm:ss')
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取新闻数据失败',
      error: error.message
    });
  }
});

// 手动触发抓取
app.post('/api/fetch-news', async (req, res) => {
  try {
    const news = await fetchNewsData();
    res.json({
      success: true,
      message: `成功抓取 ${news.length} 条新闻`,
      data: news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '抓取新闻失败',
      error: error.message
    });
  }
});

// 获取数据统计
app.get('/api/stats', async (req, res) => {
  try {
    const news = await getNewsData();
    const categories = {};
    
    news.forEach(item => {
      categories[item.category] = (categories[item.category] || 0) + 1;
    });
    
    res.json({
      success: true,
      data: {
        totalNews: news.length,
        categories: categories,
        lastUpdate: moment().format('YYYY-MM-DD HH:mm:ss')
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取统计数据失败',
      error: error.message
    });
  }
});

// 定时任务：每周一、周三早上9点抓取数据
cron.schedule('0 9 * * 1,3', async () => {
  console.log('定时任务触发：开始抓取AI新闻数据');
  await fetchNewsData();
}, {
  timezone: "Asia/Shanghai"
});

// 启动时立即抓取一次数据
fetchNewsData();

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
  console.log('定时任务已设置：每周一、周三早上9点自动抓取数据');
});

module.exports = app; 