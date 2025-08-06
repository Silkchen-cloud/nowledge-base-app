import React, { useState, useEffect } from 'react';
import { Card, List, Tag, Typography, Space, Button, message, Spin, Tooltip } from 'antd';
import { FireOutlined, EyeOutlined, CalendarOutlined, TrophyOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text, Paragraph } = Typography;

interface HotNewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  category: string;
  hotScore: number;
  publishTime: string;
}

interface WeeklySummaryData {
  week: string;
  updateTime: string;
  totalHotNews: number;
  summary: string;
  categories: string[];
  hotNews: HotNewsItem[];
  stats: {
    totalNews: number;
    hotNewsCount: number;
    topCategory: string;
    averageHotScore: number;
  };
}

const WeeklySummary: React.FC = () => {
  const [weeklyData, setWeeklyData] = useState<WeeklySummaryData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeeklySummary = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/weekly-summary');
      if (response.data.success) {
        setWeeklyData(response.data.data);
      } else {
        message.error('获取每周要闻失败');
      }
    } catch (error) {
      console.error('获取每周要闻失败:', error);
      message.error('获取每周要闻失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeeklySummary();
  }, []);

  const handleRefresh = () => {
    fetchWeeklySummary();
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'AI应用': 'blue',
      '智能芯片': 'green',
      '具身智能': 'purple',
      '算力政策': 'orange',
      '美国芯片政策': 'red',
      '专家观点': 'cyan',
      '研究报告': 'magenta'
    };
    return colors[category] || 'default';
  };

  const getHotScoreColor = (score: number) => {
    if (score >= 80) return '#ff4d4f';
    if (score >= 60) return '#fa8c16';
    return '#52c41a';
  };

  if (loading) {
    return (
      <Card size="small" style={{ marginBottom: '16px' }}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Spin size="small" />
          <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            加载每周要闻中...
          </div>
        </div>
      </Card>
    );
  }

  if (!weeklyData) {
    return (
      <Card size="small" style={{ marginBottom: '16px' }}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Text type="secondary">暂无每周要闻数据</Text>
          <br />
          <Button 
            type="link" 
            size="small" 
            onClick={handleRefresh}
            style={{ padding: '4px 0' }}
          >
            刷新
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      size="small" 
      style={{ 
        marginBottom: '16px',
        borderRadius: '8px',
        border: '1px solid #ffd591',
        background: '#fff7e6'
      }}
      title={
        <Space>
          <FireOutlined style={{ color: '#fa8c16' }} />
          <Text strong style={{ color: '#d46b08' }}>
            每周AI要闻
          </Text>
        </Space>
      }
      extra={
        <Tooltip title="刷新">
          <Button 
            type="text" 
            size="small" 
            icon={<EyeOutlined />} 
            onClick={handleRefresh}
          />
        </Tooltip>
      }
    >
      <div style={{ marginBottom: '12px' }}>
        <Space size="small" style={{ marginBottom: '8px' }}>
          <CalendarOutlined style={{ color: '#666' }} />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {weeklyData.week}
          </Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            ({weeklyData.totalHotNews}条热点)
          </Text>
        </Space>
        
        <Paragraph 
          style={{ 
            fontSize: '12px', 
            color: '#666', 
            margin: '8px 0',
            lineHeight: '1.4'
          }}
        >
          {weeklyData.summary}
        </Paragraph>
      </div>

      <List
        size="small"
        dataSource={weeklyData.hotNews.slice(0, 5)}
        renderItem={(item, index) => (
          <List.Item
            style={{ 
              padding: '8px 0',
              borderBottom: index < 4 ? '1px solid #f0f0f0' : 'none'
            }}
          >
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                <Text 
                  strong 
                  style={{ 
                    fontSize: '12px', 
                    lineHeight: '1.4',
                    flex: 1,
                    marginRight: '8px'
                  }}
                  ellipsis={{ tooltip: item.title }}
                >
                  {index + 1}. {item.title}
                </Text>
                <Space size="small">
                  <Tag 
                    color={getCategoryColor(item.category)}
                    style={{ fontSize: '10px' }}
                  >
                    {item.category}
                  </Tag>
                  <Tooltip title={`热度分数: ${item.hotScore}`}>
                    <Tag 
                      color={getHotScoreColor(item.hotScore)}
                      style={{ fontSize: '10px' }}
                    >
                      <FireOutlined /> {item.hotScore}
                    </Tag>
                  </Tooltip>
                </Space>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Space size="small">
                  <Text type="secondary" style={{ fontSize: '10px' }}>
                    {item.source}
                  </Text>
                  <Text type="secondary" style={{ fontSize: '10px' }}>
                    {item.publishTime}
                  </Text>
                </Space>
                
                <Button 
                  type="link" 
                  size="small" 
                  style={{ 
                    padding: '0', 
                    height: 'auto',
                    fontSize: '10px',
                    color: '#1890ff'
                  }}
                  onClick={() => window.open(item.url, '_blank')}
                >
                  查看原文
                </Button>
              </div>
            </div>
          </List.Item>
        )}
      />

      <div style={{ 
        marginTop: '12px', 
        padding: '8px', 
        background: '#fafafa', 
        borderRadius: '4px',
        fontSize: '11px',
        color: '#666'
      }}>
        <Space size="small">
          <TrophyOutlined style={{ color: '#faad14' }} />
          <Text>本周统计：</Text>
          <Text>总新闻 {weeklyData.stats.totalNews} 条</Text>
          <Text>•</Text>
          <Text>热点 {weeklyData.stats.hotNewsCount} 条</Text>
          <Text>•</Text>
          <Text>平均热度 {weeklyData.stats.averageHotScore}</Text>
        </Space>
      </div>
    </Card>
  );
};

export default WeeklySummary; 