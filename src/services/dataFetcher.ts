import axios from 'axios';
import moment from 'moment';

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  source: string;
  url: string;
  category: string;
  publishTime: string;
  summary: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

// 根据环境选择API地址
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? (process.env.REACT_APP_API_URL || 'https://your-railway-app.railway.app/api')
  : 'http://localhost:3001/api';

// 从后端API获取最新AI新闻
export const fetchLatestAINews = async (): Promise<NewsItem[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/news`);
    if (response.data.success) {
      return response.data.data;
    } else {
      console.error('获取新闻数据失败:', response.data.message);
      return [];
    }
  } catch (error) {
    console.error('获取AI新闻失败:', error);
    // 如果后端不可用，返回模拟数据
    return getMockData();
  }
};

// 手动触发数据抓取
export const triggerNewsFetch = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/fetch-news`);
    return {
      success: response.data.success,
      message: response.data.message
    };
  } catch (error) {
    return {
      success: false,
      message: '触发抓取失败，请检查后端服务'
    };
  }
};

// 获取数据统计
export const getNewsStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stats`);
    if (response.data.success) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error('获取统计数据失败:', error);
    return null;
  }
};

// 模拟数据（当后端不可用时使用）
const getMockData = (): NewsItem[] => {
  return [
    {
      id: '1',
      title: 'OpenAI发布GPT-4 Turbo重大更新',
      content: 'OpenAI今日宣布GPT-4 Turbo的重大更新，新版本在推理能力、代码生成和创意写作方面都有显著提升。同时降低了API调用成本，使更多开发者能够使用这一先进技术。',
      source: 'OpenAI官方博客',
      url: 'https://openai.com/blog/gpt-4-turbo-update',
      category: 'AI应用',
      publishTime: moment().subtract(2, 'hours').format('YYYY-MM-DD HH:mm'),
      summary: 'GPT-4 Turbo重大更新，性能提升成本降低'
    },
    {
      id: '2',
      title: '谷歌推出Gemini Pro 1.5模型',
      content: '谷歌发布了Gemini Pro 1.5模型，该模型在长文本处理能力方面有重大突破，能够处理长达100万token的上下文。这为文档分析、代码审查等应用场景提供了新的可能性。',
      source: 'Google AI Blog',
      url: 'https://ai.google.dev/gemini-pro-1.5',
      category: 'AI应用',
      publishTime: moment().subtract(4, 'hours').format('YYYY-MM-DD HH:mm'),
      summary: 'Gemini Pro 1.5支持100万token长文本处理'
    },
    {
      id: '3',
      title: 'AI芯片市场投资热潮持续',
      content: '随着AI应用的普及，AI芯片市场迎来新一轮投资热潮。英伟达、AMD、英特尔等巨头加大投入，同时涌现出多家专注于AI芯片的初创公司。预计2024年AI芯片市场规模将达到1000亿美元。',
      source: 'TechCrunch',
      url: 'https://techcrunch.com/ai-chip-investment',
      category: '智能芯片',
      publishTime: moment().subtract(6, 'hours').format('YYYY-MM-DD HH:mm'),
      summary: 'AI芯片市场投资热潮，预计2024年达1000亿美元'
    },
    {
      id: '4',
      title: '微软Azure AI服务新增多模态功能',
      content: '微软Azure AI服务推出新的多模态功能，支持图像、音频、视频等多种数据类型的统一处理。这将为开发者提供更强大的AI应用构建能力。',
      source: 'Microsoft Azure Blog',
      url: 'https://azure.microsoft.com/blog/multimodal-ai',
      category: 'AI应用',
      publishTime: moment().subtract(8, 'hours').format('YYYY-MM-DD HH:mm'),
      summary: 'Azure AI新增多模态功能，支持图像音频视频处理'
    },
    {
      id: '5',
      title: 'AI在医疗诊断领域取得新突破',
      content: '最新研究显示，AI在医疗影像诊断方面的准确率已经超过人类专家。这一突破为早期疾病筛查和精准医疗提供了新的技术手段。',
      source: 'Nature Medicine',
      url: 'https://www.nature.com/articles/ai-medical-diagnosis',
      category: 'AI应用',
      publishTime: moment().subtract(10, 'hours').format('YYYY-MM-DD HH:mm'),
      summary: 'AI医疗诊断准确率超人类专家，助力精准医疗'
    }
  ];
};

export const getCategories = (): Category[] => {
  return [
    { id: 'ai-application', name: 'AI应用', icon: '🤖', count: 0 },
    { id: 'smart-chip', name: '智能芯片', icon: '🔧', count: 0 },
    { id: 'embodied-ai', name: '具身智能', icon: '🦾', count: 0 },
    { id: 'computing-policy', name: '算力政策', icon: '📋', count: 0 },
    { id: 'us-chip-policy', name: '美国芯片政策', icon: '🇺🇸', count: 0 },
    { id: 'expert-opinion', name: '专家观点', icon: '🧠', count: 0 },
    { id: 'research-report', name: '研究报告', icon: '📊', count: 0 }
  ];
};

// 根据分类筛选新闻
export const filterNewsByCategory = (news: NewsItem[], category: string): NewsItem[] => {
  if (category === 'all') return news;
  return news.filter(item => item.category === category);
}; 