import React, { useState, useEffect } from "react";
import { Card, List, Tag, Typography, Space, Button, message, Spin, Tooltip, Row, Col, Statistic, Empty } from "antd";
import { FireOutlined, EyeOutlined, CalendarOutlined, ReloadOutlined } from "@ant-design/icons";
import axios from "axios";

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

const WeeklySummaryPage: React.FC = () => {
  const [weeklyData, setWeeklyData] = useState<WeeklySummaryData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeeklySummary = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/api/weekly-summary");
      if (response.data.success) {
        setWeeklyData(response.data.data);
      } else {
        message.error("获取每周要闻失败");
      }
    } catch (error) {
      console.error("获取每周要闻失败:", error);
      message.error("获取每周要闻失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeeklySummary();
  }, []);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "AI应用": "blue",
      "智能芯片": "green",
      "具身智能": "purple",
      "算力政策": "orange",
      "美国芯片政策": "red",
      "专家观点": "cyan",
      "研究报告": "magenta"
    };
    return colors[category] || "default";
  };

  const getHotScoreColor = (score: number) => {
    if (score >= 80) return "#ff4d4f";
    if (score >= 60) return "#fa8c16";
    return "#52c41a";
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        <Spin size="large" />
        <div style={{ marginTop: "16px", fontSize: "16px", color: "#666" }}>
          加载每周要闻中...
        </div>
      </div>
    );
  }

  if (!weeklyData) {
    return (
      <Card style={{ textAlign: "center", padding: "60px" }}>
        <Empty description="暂无每周要闻数据">
          <Button type="primary" onClick={fetchWeeklySummary}>
            刷新数据
          </Button>
        </Empty>
      </Card>
    );
  }

  return (
    <div style={{ padding: "24px", background: "#f7f9fb", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Card style={{ marginBottom: "24px", borderRadius: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <Title level={2} style={{ margin: 0, color: "#d46b08" }}>
                <FireOutlined style={{ marginRight: "12px" }} />
                每周AI要闻
              </Title>
              <Space size="large" style={{ marginTop: "8px" }}>
                <Text type="secondary">
                  <CalendarOutlined style={{ marginRight: "4px" }} />
                  {weeklyData.week}
                </Text>
                <Text type="secondary">
                  更新时间：{weeklyData.updateTime}
                </Text>
              </Space>
            </div>
            <Button icon={<ReloadOutlined />} onClick={fetchWeeklySummary} loading={loading}>
              刷新
            </Button>
          </div>
        </Card>

        <Row gutter={16} style={{ marginBottom: "24px" }}>
          <Col span={6}>
            <Card>
              <Statistic
                title="总新闻数"
                value={weeklyData.stats.totalNews}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="热点新闻"
                value={weeklyData.stats.hotNewsCount}
                valueStyle={{ color: "#fa8c16" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="平均热度"
                value={weeklyData.stats.averageHotScore}
                valueStyle={{ color: "#52c41a" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="主要分类"
                value={weeklyData.stats.topCategory}
                valueStyle={{ color: "#722ed1" }}
              />
            </Card>
          </Col>
        </Row>

        <Card 
          title="本周总结" 
          style={{ marginBottom: "24px", borderRadius: "12px" }}
          headStyle={{ 
            background: "#fff7e6", 
            borderBottom: "1px solid #ffd591",
            borderRadius: "12px 12px 0 0"
          }}
        >
          <Paragraph style={{ fontSize: "16px", lineHeight: "1.6", margin: 0 }}>
            {weeklyData.summary}
          </Paragraph>
          <div style={{ marginTop: "16px" }}>
            <Text strong>涉及分类：</Text>
            <Space wrap style={{ marginTop: "8px" }}>
              {weeklyData.categories.map(category => (
                <Tag key={category} color={getCategoryColor(category)}>
                  {category}
                </Tag>
              ))}
            </Space>
          </div>
        </Card>

        <Card 
          title={`热点新闻 (${weeklyData.totalHotNews}条)`}
          style={{ borderRadius: "12px" }}
          headStyle={{ 
            background: "#fff7e6", 
            borderBottom: "1px solid #ffd591",
            borderRadius: "12px 12px 0 0"
          }}
        >
          <List
            dataSource={weeklyData.hotNews}
            renderItem={(item, index) => (
              <List.Item
                style={{ 
                  padding: "20px 0",
                  borderBottom: index < weeklyData.hotNews.length - 1 ? "1px solid #f0f0f0" : "none"
                }}
              >
                <div style={{ width: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div style={{ flex: 1, marginRight: "16px" }}>
                      <Title level={4} style={{ margin: "0 0 8px 0", lineHeight: "1.4" }}>
                        {index + 1}. {item.title}
                      </Title>
                      <Paragraph 
                        style={{ 
                          fontSize: "14px", 
                          color: "#666",
                          lineHeight: "1.6",
                          margin: "0 0 12px 0"
                        }}
                        ellipsis={{ rows: 2, tooltip: item.summary }}
                      >
                        {item.summary}
                      </Paragraph>
                    </div>
                    <Space direction="vertical" size="small" align="end">
                      <Space size="small">
                        <Tag color={getCategoryColor(item.category)}>
                          {item.category}
                        </Tag>
                        <Tooltip title={`热度分数: ${item.hotScore}`}>
                          <Tag 
                            color={getHotScoreColor(item.hotScore)}
                            style={{ fontWeight: "bold" }}
                          >
                            <FireOutlined /> {item.hotScore}
                          </Tag>
                        </Tooltip>
                      </Space>
                    </Space>
                  </div>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Space size="small">
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        来源：{item.source}
                      </Text>
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        发布时间：{item.publishTime}
                      </Text>
                    </Space>
                    
                    <Button 
                      type="primary" 
                      size="small"
                      icon={<EyeOutlined />}
                      onClick={() => window.open(item.url, "_blank")}
                    >
                      查看原文
                    </Button>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
};

export default WeeklySummaryPage;
