import React from 'react';
import { Card, Row, Col, Statistic, Progress } from 'antd';
import { 
  BarChartOutlined, 
  PieChartOutlined, 
  LineChartOutlined,
  RiseOutlined 
} from '@ant-design/icons';

interface CategoryStats {
  name: string;
  count: number;
  percentage: number;
}

interface DataVisualizationProps {
  totalNews: number;
  categoryStats: CategoryStats[];
  recentTrend: number; // 最近7天的增长百分比
  topSources: Array<{ name: string; count: number }>;
}

const DataVisualization: React.FC<DataVisualizationProps> = ({
  totalNews,
  categoryStats,
  recentTrend,
  topSources
}) => {
  // 计算分类分布
  const categoryDistribution = categoryStats.map(stat => ({
    name: stat.name,
    value: stat.count,
    percentage: stat.percentage
  }));

  // 生成颜色数组
  const colors = [
    '#1890ff', '#52c41a', '#faad14', '#f5222d', 
    '#722ed1', '#13c2c2', '#eb2f96', '#fa8c16'
  ];

  return (
    <div style={{ marginBottom: 24 }}>
      {/* 统计概览 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            style={{ 
              borderRadius: 12, 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}
          >
            <Statistic
              title="总新闻数"
              value={totalNews}
              prefix={<BarChartOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff', fontSize: 24, fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card 
            style={{ 
              borderRadius: 12, 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}
          >
            <Statistic
              title="分类数量"
              value={categoryStats.length}
              prefix={<PieChartOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a', fontSize: 24, fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card 
            style={{ 
              borderRadius: 12, 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}
          >
            <Statistic
              title="最近趋势"
              value={recentTrend}
              prefix={<RiseOutlined style={{ color: recentTrend >= 0 ? '#52c41a' : '#f5222d' }} />}
              suffix="%"
              valueStyle={{ 
                color: recentTrend >= 0 ? '#52c41a' : '#f5222d', 
                fontSize: 24, 
                fontWeight: 'bold' 
              }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card 
            style={{ 
              borderRadius: 12, 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}
          >
            <Statistic
              title="数据源"
              value={topSources.length}
              prefix={<LineChartOutlined style={{ color: '#722ed1' }} />}
              valueStyle={{ color: '#722ed1', fontSize: 24, fontWeight: 'bold' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 分类分布图表 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <PieChartOutlined style={{ color: '#1890ff' }} />
                <span>分类分布</span>
              </div>
            }
            style={{ 
              borderRadius: 12, 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              height: '100%'
            }}
          >
            <div style={{ padding: '16px 0' }}>
              {categoryDistribution.map((category, index) => (
                <div key={category.name} style={{ marginBottom: 16 }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: 8
                  }}>
                    <span style={{ fontWeight: 500, color: '#333' }}>
                      {category.name}
                    </span>
                    <span style={{ color: '#666', fontSize: 14 }}>
                      {category.value} ({category.percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <Progress
                    percent={category.percentage}
                    strokeColor={colors[index % colors.length]}
                    showInfo={false}
                    strokeWidth={8}
                    style={{ margin: 0 }}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <BarChartOutlined style={{ color: '#52c41a' }} />
                <span>热门来源</span>
              </div>
            }
            style={{ 
              borderRadius: 12, 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              height: '100%'
            }}
          >
            <div style={{ padding: '16px 0' }}>
              {topSources.slice(0, 8).map((source, index) => (
                <div key={source.name} style={{ marginBottom: 16 }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: 8
                  }}>
                    <span style={{ 
                      fontWeight: 500, 
                      color: '#333',
                      maxWidth: '60%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {source.name}
                    </span>
                    <span style={{ color: '#666', fontSize: 14 }}>
                      {source.count} 篇
                    </span>
                  </div>
                  <Progress
                    percent={topSources.length > 0 ? (source.count / Math.max(...topSources.map(s => s.count))) * 100 : 0}
                    strokeColor={colors[index % colors.length]}
                    showInfo={false}
                    strokeWidth={8}
                    style={{ margin: 0 }}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DataVisualization; 