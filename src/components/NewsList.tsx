import React, { useState } from 'react';
import { List, Card, Tag, Button, Space, Typography, Spin, message } from 'antd';
import { LinkOutlined, ClockCircleOutlined, UserOutlined, ReloadOutlined } from '@ant-design/icons';
import { NewsItem, triggerNewsFetch } from '../services/dataFetcher';

const { Text, Paragraph } = Typography;

interface NewsListProps {
  news: NewsItem[];
  loading: boolean;
  onRefresh: () => void;
}

const NewsList: React.FC<NewsListProps> = ({ news, loading, onRefresh }) => {
  const [fetching, setFetching] = useState(false);

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      '产品发布': 'blue',
      '技术突破': 'green',
      '投资动态': 'orange',
      '应用案例': 'purple',
      '政策法规': 'red',
      '研究报告': 'cyan',
      '专家观点': 'magenta'
    };
    return colorMap[category] || 'default';
  };

  const handleManualFetch = async () => {
    setFetching(true);
    try {
      const result = await triggerNewsFetch();
      if (result.success) {
        message.success(result.message);
        // 延迟刷新数据，等待后端处理完成
        setTimeout(() => {
          onRefresh();
        }, 2000);
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error('触发抓取失败');
    } finally {
      setFetching(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px' 
      }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h2 style={{ 
          margin: 0, 
          color: '#222B45',
          fontSize: '24px',
          fontWeight: 600
        }}>
          智算科技行业研究中心 - 最新资讯 ({news.length}条)
        </h2>
        <Space>
          <Button 
            type="primary" 
            icon={<ReloadOutlined />}
            onClick={handleManualFetch}
            loading={fetching}
            style={{ borderRadius: '8px' }}
          >
            手动抓取
          </Button>
          <Button 
            onClick={onRefresh}
            style={{ borderRadius: '8px' }}
          >
            刷新数据
          </Button>
        </Space>
      </div>

      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={news}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              style={{ 
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }}
              actions={[
                <Button 
                  type="link" 
                  icon={<LinkOutlined />}
                  onClick={() => window.open(item.url, '_blank')}
                  style={{ padding: 0 }}
                >
                  查看原文
                </Button>
              ]}
            >
              <div style={{ marginBottom: '12px' }}>
                <Space size={8}>
                  <Tag color={getCategoryColor(item.category)}>
                    {item.category}
                  </Tag>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    <ClockCircleOutlined style={{ marginRight: '4px' }} />
                    {item.publishTime}
                  </Text>
                </Space>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <Text strong style={{ 
                  fontSize: '18px', 
                  color: '#222B45',
                  lineHeight: '1.4'
                }}>
                  {item.title}
                </Text>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <Paragraph 
                  ellipsis={{ rows: 3, expandable: true, symbol: '展开' }}
                  style={{ 
                    color: '#666',
                    lineHeight: '1.6',
                    margin: 0
                  }}
                >
                  {item.content}
                </Paragraph>
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  <UserOutlined style={{ marginRight: '4px' }} />
                  来源: {item.source}
                </Text>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  摘要: {item.summary}
                </Text>
              </div>
            </Card>
          </List.Item>
        )}
        locale={{
          emptyText: (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px',
              color: '#999'
            }}>
              <p>暂无数据</p>
              <Space>
                <Button type="primary" onClick={handleManualFetch} loading={fetching}>
                  手动抓取
                </Button>
                <Button onClick={onRefresh}>
                  刷新数据
                </Button>
              </Space>
            </div>
          )
        }}
      />
    </div>
  );
};

export default NewsList; 