import React, { useState } from 'react';
import { 
  Card, 
  Form, 
  Switch, 
  Select, 
  InputNumber, 
  Button, 
  Space, 
  Typography, 
  Row, 
  Col,
  message,
  ColorPicker,
  Slider
} from 'antd';
import { 
  SettingOutlined, 
  BellOutlined, 
  EyeOutlined, 
  SaveOutlined,
  ReloadOutlined
} from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

interface UserSettingsData {
  // 界面设置
  theme: 'light' | 'dark' | 'auto';
  primaryColor: string;
  fontSize: number;
  compactMode: boolean;
  
  // 功能设置
  autoRefresh: boolean;
  refreshInterval: number;
  notifications: boolean;
  soundEnabled: boolean;
  
  // 显示设置
  itemsPerPage: number;
  showThumbnails: boolean;
  showSummary: boolean;
  defaultView: 'list' | 'grid' | 'card';
  
  // 搜索设置
  searchHistory: boolean;
  searchSuggestions: boolean;
  defaultSearchCategory: string;
}

const UserSettings: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 默认设置
  const defaultSettings: UserSettingsData = {
    theme: 'light',
    primaryColor: '#1890ff',
    fontSize: 14,
    compactMode: false,
    autoRefresh: true,
    refreshInterval: 5,
    notifications: true,
    soundEnabled: false,
    itemsPerPage: 20,
    showThumbnails: true,
    showSummary: true,
    defaultView: 'list',
    searchHistory: true,
    searchSuggestions: true,
    defaultSearchCategory: 'all'
  };

  const handleSave = async (values: UserSettingsData) => {
    setLoading(true);
    try {
      // 这里可以调用API保存设置
      localStorage.setItem('userSettings', JSON.stringify(values));
      message.success('设置保存成功');
    } catch (error) {
      message.error('设置保存失败');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.setFieldsValue(defaultSettings);
    message.info('设置已重置为默认值');
  };

  React.useEffect(() => {
    const loadSettings = () => {
      try {
        const saved = localStorage.getItem('userSettings');
        if (saved) {
          const settings = JSON.parse(saved);
          form.setFieldsValue(settings);
        } else {
          form.setFieldsValue(defaultSettings);
        }
      } catch (error) {
        form.setFieldsValue(defaultSettings);
      }
    };
    
    loadSettings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, defaultSettings]);

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <Title level={2} style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
        <SettingOutlined style={{ color: '#1890ff' }} />
        用户设置
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={defaultSettings}
      >
        {/* 界面设置 */}
        <Card 
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <EyeOutlined style={{ color: '#1890ff' }} />
              界面设置
            </div>
          }
          style={{ marginBottom: 24, borderRadius: 12 }}
        >
          <Row gutter={[24, 16]}>
            <Col span={12}>
              <Form.Item
                label="主题模式"
                name="theme"
              >
                <Select>
                  <Option value="light">浅色主题</Option>
                  <Option value="dark">深色主题</Option>
                  <Option value="auto">跟随系统</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item
                label="主色调"
                name="primaryColor"
              >
                <ColorPicker />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item
                label="字体大小"
                name="fontSize"
              >
                <Slider
                  min={12}
                  max={20}
                  marks={{
                    12: '小',
                    14: '中',
                    16: '大',
                    18: '特大',
                    20: '超大'
                  }}
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item
                label="紧凑模式"
                name="compactMode"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* 功能设置 */}
        <Card 
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <BellOutlined style={{ color: '#1890ff' }} />
              功能设置
            </div>
          }
          style={{ marginBottom: 24, borderRadius: 12 }}
        >
          <Row gutter={[24, 16]}>
            <Col span={12}>
              <Form.Item
                label="自动刷新"
                name="autoRefresh"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item
                label="刷新间隔（分钟）"
                name="refreshInterval"
              >
                <InputNumber min={1} max={60} />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item
                label="启用通知"
                name="notifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item
                label="声音提醒"
                name="soundEnabled"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* 显示设置 */}
        <Card 
          title="显示设置"
          style={{ marginBottom: 24, borderRadius: 12 }}
        >
          <Row gutter={[24, 16]}>
            <Col span={12}>
              <Form.Item
                label="每页显示数量"
                name="itemsPerPage"
              >
                <Select>
                  <Option value={10}>10条</Option>
                  <Option value={20}>20条</Option>
                  <Option value={50}>50条</Option>
                  <Option value={100}>100条</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item
                label="默认视图"
                name="defaultView"
              >
                <Select>
                  <Option value="list">列表视图</Option>
                  <Option value="grid">网格视图</Option>
                  <Option value="card">卡片视图</Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item
                label="显示缩略图"
                name="showThumbnails"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item
                label="显示摘要"
                name="showSummary"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* 搜索设置 */}
        <Card 
          title="搜索设置"
          style={{ marginBottom: 24, borderRadius: 12 }}
        >
          <Row gutter={[24, 16]}>
            <Col span={12}>
              <Form.Item
                label="保存搜索历史"
                name="searchHistory"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item
                label="搜索建议"
                name="searchSuggestions"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item
                label="默认搜索分类"
                name="defaultSearchCategory"
              >
                <Select>
                  <Option value="all">全部分类</Option>
                  <Option value="product">产品发布</Option>
                  <Option value="tech">技术突破</Option>
                  <Option value="investment">投资动态</Option>
                  <Option value="application">应用案例</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* 操作按钮 */}
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Space size="large">
            <Button 
              type="primary" 
              icon={<SaveOutlined />}
              size="large"
              loading={loading}
              onClick={() => form.submit()}
              style={{ borderRadius: 8 }}
            >
              保存设置
            </Button>
            
            <Button 
              icon={<ReloadOutlined />}
              size="large"
              onClick={handleReset}
              style={{ borderRadius: 8 }}
            >
              重置默认
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default UserSettings; 