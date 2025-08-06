import React, { useState, useEffect, useMemo } from 'react';
import { Layout, message, Space, Tabs } from 'antd';
import Sidebar from '../components/Sidebar';
import NewsList from '../components/NewsList';
import SearchBar from '../components/SearchBar';
import DataVisualization from '../components/DataVisualization';
import NotificationCenter from '../components/NotificationCenter';
import ExportTools from '../components/ExportTools';
import { fetchLatestAINews, getCategories, Category, NewsItem } from '../services/dataFetcher';
import moment from 'moment';

const { Content } = Layout;

const HomePage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [searchFilters, setSearchFilters] = useState({
    keyword: '',
    category: 'all',
    dateRange: 'all',
    source: 'all'
  });
  const [notifications, setNotifications] = useState<any[]>([]);
  const [exportLoading, setExportLoading] = useState(false);

  // 初始化数据
  useEffect(() => {
    loadData();
  }, []);

  // 当新闻或分类变化时，重新筛选
  useEffect(() => {
    let filtered = news;

    // 分类筛选
    if (selectedCategory !== 'all') {
      const categoryName = categories.find(cat => cat.id === selectedCategory)?.name;
      if (categoryName) {
        filtered = filtered.filter(item => item.category === categoryName);
      }
    }

    // 搜索关键词筛选
    if (searchFilters.keyword) {
      const keyword = searchFilters.keyword.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(keyword) ||
        item.content.toLowerCase().includes(keyword) ||
        item.summary.toLowerCase().includes(keyword)
      );
    }

    // 时间范围筛选
    if (searchFilters.dateRange !== 'all') {
      const now = moment();
      filtered = filtered.filter(item => {
        const itemTime = moment(item.publishTime);
        switch (searchFilters.dateRange) {
          case 'today':
            return itemTime.isSame(now, 'day');
          case 'week':
            return itemTime.isAfter(now.subtract(7, 'days'));
          case 'month':
            return itemTime.isAfter(now.subtract(1, 'month'));
          case 'quarter':
            return itemTime.isAfter(now.subtract(3, 'months'));
          default:
            return true;
        }
      });
    }

    // 来源筛选
    if (searchFilters.source !== 'all') {
      filtered = filtered.filter(item => item.source === searchFilters.source);
    }

    setFilteredNews(filtered);
  }, [news, selectedCategory, categories, searchFilters]);

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

  // 处理搜索
  const handleSearch = (filters: any) => {
    setSearchFilters(filters);
  };

  const handleClearSearch = () => {
    setSearchFilters({
      keyword: '',
      category: 'all',
      dateRange: 'all',
      source: 'all'
    });
  };

  // 处理通知
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // 处理导出
  const handleExport = async (options: any) => {
    setExportLoading(true);
    try {
      // 这里可以调用实际的导出API
      console.log('导出选项:', options);
      message.success('导出功能开发中...');
    } catch (error) {
      message.error('导出失败');
    } finally {
      setExportLoading(false);
    }
  };

  // 计算统计数据
  const stats = useMemo(() => {
    const categoryStats = categories.map(cat => {
      const count = news.filter(item => item.category === cat.name).length;
      const percentage = news.length > 0 ? (count / news.length) * 100 : 0;
      return { name: cat.name, count, percentage };
    });

    const sources = Array.from(new Set(news.map(item => item.source)));
    const topSources = sources.map(source => ({
      name: source,
      count: news.filter(item => item.source === source).length
    })).sort((a, b) => b.count - a.count);

    // 计算最近趋势（简单示例）
    const recentTrend = 15; // 这里可以根据实际数据计算

    return {
      categoryStats,
      topSources,
      recentTrend
    };
  }, [news, categories]);

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
          <Tabs
            defaultActiveKey="news"
            items={[
              {
                key: 'news',
                label: '最新资讯',
                children: (
                  <div>
                    {/* 搜索栏 */}
                    <SearchBar
                      onSearch={handleSearch}
                      onClear={handleClearSearch}
                      categories={categories}
                      sources={Array.from(new Set(news.map(item => item.source)))}
                      loading={loading}
                    />
                    
                    {/* 工具栏 */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: 16
                    }}>
                      <div>
                        <span style={{ color: '#666', fontSize: 14 }}>
                          共找到 {filteredNews.length} 条相关新闻
                        </span>
                      </div>
                      <Space>
                        <NotificationCenter
                          notifications={notifications}
                          onMarkAsRead={handleMarkAsRead}
                          onMarkAllAsRead={handleMarkAllAsRead}
                          onDeleteNotification={handleDeleteNotification}
                        />
                        <ExportTools
                          onExport={handleExport}
                          categories={categories}
                          totalItems={filteredNews.length}
                          loading={exportLoading}
                        />
                      </Space>
                    </div>

                    <NewsList
                      news={filteredNews}
                      loading={loading}
                      onRefresh={loadData}
                    />
                  </div>
                )
              },
              {
                key: 'analytics',
                label: '数据分析',
                children: (
                  <DataVisualization
                    totalNews={news.length}
                    categoryStats={stats.categoryStats}
                    recentTrend={stats.recentTrend}
                    topSources={stats.topSources}
                  />
                )
              }
            ]}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage; 