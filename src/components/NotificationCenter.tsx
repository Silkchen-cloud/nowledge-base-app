import React, { useState } from 'react';
import { Card, List, Badge, Button, Space, Tag, Typography, Avatar } from 'antd';
import { 
  BellOutlined, 
  CloseOutlined, 
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import moment from 'moment';

const { Text, Paragraph } = Typography;

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category?: string;
  newsId?: string;
}

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  onNewsClick?: (newsId: string) => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onNewsClick
}) => {
  const [visible, setVisible] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'warning':
        return <ExclamationCircleOutlined style={{ color: '#faad14' }} />;
      case 'error':
        return <ExclamationCircleOutlined style={{ color: '#f5222d' }} />;
      case 'success':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      default:
        return <InfoCircleOutlined style={{ color: '#1890ff' }} />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'warning':
        return '#faad14';
      case 'error':
        return '#f5222d';
      case 'success':
        return '#52c41a';
      default:
        return '#1890ff';
    }
  };

  const formatTime = (timestamp: string) => {
    const now = moment();
    const time = moment(timestamp);
    const diffMinutes = now.diff(time, 'minutes');
    const diffHours = now.diff(time, 'hours');
    const diffDays = now.diff(time, 'days');

    if (diffMinutes < 60) {
      return `${diffMinutes}分钟前`;
    } else if (diffHours < 24) {
      return `${diffHours}小时前`;
    } else if (diffDays < 7) {
      return `${diffDays}天前`;
    } else {
      return time.format('MM-DD HH:mm');
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* 通知按钮 */}
      <Badge count={unreadCount} size="small">
        <Button
          type="text"
          icon={<BellOutlined />}
          onClick={() => setVisible(!visible)}
          style={{ 
            fontSize: 18, 
            color: unreadCount > 0 ? '#1890ff' : '#666',
            height: 40,
            width: 40,
            borderRadius: '50%'
          }}
        />
      </Badge>

      {/* 通知面板 */}
      {visible && (
        <Card
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            width: 400,
            maxHeight: 500,
            zIndex: 1000,
            borderRadius: 12,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            marginTop: 8
          }}
          bodyStyle={{ padding: 0 }}
        >
          {/* 头部 */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <BellOutlined style={{ color: '#1890ff' }} />
              <Text strong>通知中心</Text>
              {unreadCount > 0 && (
                <Badge count={unreadCount} size="small" />
              )}
            </div>
            <Space>
              {unreadCount > 0 && (
                <Button 
                  type="link" 
                  size="small"
                  onClick={onMarkAllAsRead}
                >
                  全部已读
                </Button>
              )}
              <Button
                type="text"
                icon={<CloseOutlined />}
                size="small"
                onClick={() => setVisible(false)}
              />
            </Space>
          </div>

          {/* 通知列表 */}
          <div style={{ maxHeight: 400, overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <div style={{
                padding: '40px 20px',
                textAlign: 'center',
                color: '#999'
              }}>
                <BellOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                <div>暂无通知</div>
              </div>
            ) : (
              <List
                dataSource={notifications}
                renderItem={(notification) => (
                  <List.Item
                    style={{
                      padding: '12px 20px',
                      borderBottom: '1px solid #f0f0f0',
                      cursor: 'pointer',
                      backgroundColor: notification.read ? '#fff' : '#f8f9fa',
                      transition: 'background-color 0.2s'
                    }}
                    onClick={() => {
                      if (!notification.read) {
                        onMarkAsRead(notification.id);
                      }
                      if (notification.newsId && onNewsClick) {
                        onNewsClick(notification.newsId);
                      }
                    }}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar 
                          icon={getNotificationIcon(notification.type)}
                          style={{ 
                            backgroundColor: getNotificationColor(notification.type),
                            color: '#fff'
                          }}
                        />
                      }
                      title={
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Text 
                            strong={!notification.read}
                            style={{ 
                              color: notification.read ? '#666' : '#333',
                              fontSize: 14
                            }}
                          >
                            {notification.title}
                          </Text>
                          <Space size="small">
                            {notification.category && (
                              <Tag color="blue">{notification.category}</Tag>
                            )}
                            <Button
                              type="text"
                              size="small"
                              icon={<CloseOutlined />}
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteNotification(notification.id);
                              }}
                              style={{ padding: 0, height: 'auto' }}
                            />
                          </Space>
                        </div>
                      }
                      description={
                        <div>
                          <Paragraph 
                            style={{ 
                              margin: '4px 0',
                              color: notification.read ? '#999' : '#666',
                              fontSize: 13,
                              lineHeight: 1.4
                            }}
                            ellipsis={{ rows: 2 }}
                          >
                            {notification.message}
                          </Paragraph>
                          <Text 
                            type="secondary" 
                            style={{ fontSize: 12 }}
                          >
                            {formatTime(notification.timestamp)}
                          </Text>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default NotificationCenter; 