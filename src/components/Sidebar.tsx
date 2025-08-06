import React, { useState } from 'react';
import { Layout, Menu, Button, Modal, Input, Select, message, Card, Typography } from 'antd';
import { PlusOutlined, BookOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { Category } from '../services/dataFetcher';

const { Sider } = Layout;
const { Option } = Select;
const { Text, Paragraph } = Typography;

interface SidebarProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  onAddCategory: (category: Omit<Category, 'id' | 'count'>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  onAddCategory
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('📁');

  const iconOptions = [
    { value: '🚀', label: '产品发布' },
    { value: '⚡', label: '技术突破' },
    { value: '💰', label: '投资动态' },
    { value: '🔬', label: '应用案例' },
    { value: '📋', label: '政策法规' },
    { value: '📊', label: '研究报告' },
    { value: '🎯', label: '市场分析' },
    { value: '🔧', label: '技术工具' },
    { value: '📱', label: '移动应用' },
    { value: '🌐', label: '网络技术' },
    { value: '🤖', label: '机器人' },
    { value: '📈', label: '数据分析' }
  ];

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      message.error('请输入分类名称');
      return;
    }

    onAddCategory({
      name: newCategoryName.trim(),
      icon: newCategoryIcon
    });

    setNewCategoryName('');
    setNewCategoryIcon('📁');
    setIsModalVisible(false);
    message.success('分类添加成功');
  };

  const menuItems = [
    {
      key: 'all',
      icon: <BookOutlined />,
      label: `全部内容 (${categories.reduce((sum, cat) => sum + cat.count, 0)})`
    },
    ...categories.map(category => ({
      key: category.id,
      icon: <span style={{ fontSize: '16px' }}>{category.icon}</span>,
      label: `${category.name} (${category.count})`
    }))
  ];

  return (
    <>
      <Sider
        width={280}
        style={{
          background: '#fff',
          borderRight: '1px solid #f0f0f0',
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000
        }}
      >
        <div style={{ padding: '16px' }}>
          <h3 style={{ 
            margin: '0 0 16px 0', 
            color: '#222B45',
            fontSize: '18px',
            fontWeight: 600
          }}>
            智算科技行业研究中心知识库
          </h3>
          
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
            style={{ 
              width: '100%', 
              marginBottom: '16px',
              borderRadius: '8px'
            }}
          >
            添加分类
          </Button>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[selectedCategory]}
          items={menuItems}
          onClick={({ key }) => onCategorySelect(key)}
          style={{
            border: 'none',
            background: 'transparent'
          }}
        />

        {/* 技术支持栏目 */}
        <div style={{ 
          padding: '16px', 
          marginTop: '24px',
          borderTop: '1px solid #f0f0f0'
        }}>
          <Card
            size="small"
            style={{
              borderRadius: '8px',
              border: '1px solid #e6f7ff',
              background: '#f6ffed'
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '12px' 
            }}>
              <CustomerServiceOutlined 
                style={{ 
                  fontSize: '16px', 
                  color: '#52c41a', 
                  marginRight: '8px' 
                }} 
              />
              <Text strong style={{ color: '#52c41a' }}>
                技术支持
              </Text>
            </div>
            
            <Paragraph style={{ 
              fontSize: '12px', 
              lineHeight: '1.5',
              margin: 0,
              color: '#666'
            }}>
              <Text strong>更新说明：</Text><br />
              本网页每周一、周三早上9点自动更新，其余时间也可手动抓取更新。
            </Paragraph>
            
            <Paragraph style={{ 
              fontSize: '12px', 
              lineHeight: '1.5',
              margin: '8px 0 0 0',
              color: '#666'
            }}>
              <Text strong>技术咨询：</Text><br />
              战略运营中心 肖嘉晨<br />
              <Text copyable style={{ color: '#1890ff' }}>
                18099158709
              </Text>
            </Paragraph>
          </Card>
        </div>
      </Sider>

      <Modal
        title="添加新分类"
        open={isModalVisible}
        onOk={handleAddCategory}
        onCancel={() => setIsModalVisible(false)}
        okText="添加"
        cancelText="取消"
      >
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
            分类名称
          </label>
          <Input
            placeholder="请输入分类名称"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onPressEnter={handleAddCategory}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
            选择图标
          </label>
          <Select
            value={newCategoryIcon}
            onChange={setNewCategoryIcon}
            style={{ width: '100%' }}
            placeholder="选择图标"
          >
            {iconOptions.map(option => (
              <Option key={option.value} value={option.value}>
                <span style={{ marginRight: '8px' }}>{option.value}</span>
                {option.label}
              </Option>
            ))}
          </Select>
        </div>
      </Modal>
    </>
  );
};

export default Sidebar; 