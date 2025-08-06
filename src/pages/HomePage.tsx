import React, { useState, useEffect } from 'react';
import { Layout, message } from 'antd';
import Sidebar from '../components/Sidebar';
import NewsList from '../components/NewsList';
import { fetchLatestAINews, getCategories, Category, NewsItem } from '../services/dataFetcher';

const { Content } = Layout;

const HomePage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);

  // 初始化数据
  useEffect(() => {
    loadData();
  }, []);

  // 当新闻或分类变化时，重新筛选
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredNews(news);
    } else {
      // 根据分类名称筛选
      const categoryName = categories.find(cat => cat.id === selectedCategory)?.name;
      if (categoryName) {
        const filtered = news.filter(item => item.category === categoryName);
        setFilteredNews(filtered);
      } else {
        setFilteredNews(news);
      }
    }
  }, [news, selectedCategory, categories]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [newsData, categoriesData] = await Promise.all([
        fetchLatestAINews(),
        Promise.resolve(getCategories())
      ]);
      
      setNews(newsData);
      
      // 更新分类计数
      const updatedCategories = categoriesData.map(cat => ({
        ...cat,
        count: newsData.filter(item => item.category === cat.name).length
      }));
      setCategories(updatedCategories);
      
      message.success('数据加载成功');
    } catch (error) {
      message.error('数据加载失败');
      console.error('加载数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category: string) => {
    console.log('选择分类:', category); // 调试日志
    setSelectedCategory(category);
  };

  const handleAddCategory = (newCategory: Omit<Category, 'id' | 'count'>) => {
    const newId = `custom_${Date.now()}`;
    const newCategoryWithId: Category = {
      ...newCategory,
      id: newId,
      count: 0
    };
    
    setCategories(prev => [...prev, newCategoryWithId]);
    message.success(`分类 "${newCategory.name}" 添加成功`);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f7f9fb' }}>
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        onAddCategory={handleAddCategory}
      />
      
      <Layout style={{ marginLeft: 280 }}>
        <Content style={{ 
          margin: '24px',
          padding: '24px',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          minHeight: 'calc(100vh - 48px)'
        }}>
          <NewsList
            news={filteredNews}
            loading={loading}
            onRefresh={loadData}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage; 