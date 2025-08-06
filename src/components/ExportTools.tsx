import React, { useState } from 'react';
import { Button, Dropdown, Modal, Form, Select, Checkbox, Space, message, Card } from 'antd';
import { 
  DownloadOutlined, 
  FileTextOutlined, 
  FileExcelOutlined,
  FilePdfOutlined,
  SettingOutlined,
  CheckOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Option } = Select;

interface ExportOptions {
  format: 'json' | 'csv' | 'excel' | 'pdf';
  includeContent: boolean;
  includeMetadata: boolean;
  dateRange: string;
  categories: string[];
}

interface ExportToolsProps {
  onExport: (options: ExportOptions) => void;
  categories: Array<{ id: string; name: string }>;
  totalItems: number;
  loading?: boolean;
}

const ExportTools: React.FC<ExportToolsProps> = ({
  onExport,
  categories,
  totalItems,
  loading = false
}) => {
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleQuickExport = (format: ExportOptions['format']) => {
    const defaultOptions: ExportOptions = {
      format,
      includeContent: true,
      includeMetadata: true,
      dateRange: 'all',
      categories: []
    };
    onExport(defaultOptions);
    message.success(`正在导出${format.toUpperCase()}格式文件...`);
  };

  const handleAdvancedExport = async () => {
    try {
      const values = await form.validateFields();
      onExport(values);
      setExportModalVisible(false);
      message.success('正在导出文件...');
    } catch (error) {
      console.error('导出配置验证失败:', error);
    }
  };

  const exportMenuItems: MenuProps['items'] = [
    {
      key: 'json',
      icon: <FileTextOutlined />,
      label: '导出为 JSON',
      onClick: () => handleQuickExport('json')
    },
    {
      key: 'csv',
      icon: <FileTextOutlined />,
      label: '导出为 CSV',
      onClick: () => handleQuickExport('csv')
    },
    {
      key: 'excel',
      icon: <FileExcelOutlined />,
      label: '导出为 Excel',
      onClick: () => handleQuickExport('excel')
    },
    {
      key: 'pdf',
      icon: <FilePdfOutlined />,
      label: '导出为 PDF',
      onClick: () => handleQuickExport('pdf')
    },
    {
      type: 'divider'
    },
    {
      key: 'advanced',
      icon: <SettingOutlined />,
      label: '高级导出设置',
      onClick: () => setExportModalVisible(true)
    }
  ];

  return (
    <>
      <Dropdown
        menu={{ items: exportMenuItems }}
        placement="bottomRight"
        trigger={['click']}
      >
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          loading={loading}
          style={{ borderRadius: 8 }}
        >
          导出数据
        </Button>
      </Dropdown>

      {/* 高级导出设置模态框 */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <SettingOutlined style={{ color: '#1890ff' }} />
            <span>高级导出设置</span>
          </div>
        }
        open={exportModalVisible}
        onOk={handleAdvancedExport}
        onCancel={() => setExportModalVisible(false)}
        width={600}
        okText="开始导出"
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            format: 'excel',
            includeContent: true,
            includeMetadata: true,
            dateRange: 'all',
            categories: []
          }}
        >
          <Form.Item
            label="导出格式"
            name="format"
            rules={[{ required: true, message: '请选择导出格式' }]}
          >
            <Select placeholder="选择导出格式">
              <Option value="json">
                <Space>
                  <FileTextOutlined />
                  JSON 格式
                </Space>
              </Option>
              <Option value="csv">
                <Space>
                  <FileTextOutlined />
                  CSV 格式
                </Space>
              </Option>
              <Option value="excel">
                <Space>
                  <FileExcelOutlined />
                  Excel 格式
                </Space>
              </Option>
              <Option value="pdf">
                <Space>
                  <FilePdfOutlined />
                  PDF 格式
                </Space>
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="时间范围"
            name="dateRange"
            rules={[{ required: true, message: '请选择时间范围' }]}
          >
            <Select placeholder="选择时间范围">
              <Option value="all">全部时间</Option>
              <Option value="today">今天</Option>
              <Option value="week">最近一周</Option>
              <Option value="month">最近一月</Option>
              <Option value="quarter">最近一季度</Option>
              <Option value="year">最近一年</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="分类筛选"
            name="categories"
          >
            <Select
              mode="multiple"
              placeholder="选择要导出的分类（不选则导出全部）"
              allowClear
            >
              {categories.map(cat => (
                <Option key={cat.id} value={cat.id}>{cat.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Card 
            size="small" 
            title="导出内容选项"
            style={{ marginBottom: 16 }}
          >
            <Form.Item
              name="includeContent"
              valuePropName="checked"
            >
              <Checkbox>
                包含详细内容
              </Checkbox>
            </Form.Item>

            <Form.Item
              name="includeMetadata"
              valuePropName="checked"
            >
              <Checkbox>
                包含元数据（发布时间、来源等）
              </Checkbox>
            </Form.Item>
          </Card>

          <div style={{ 
            padding: '12px 16px', 
            backgroundColor: '#f6f8fa', 
            borderRadius: 8,
            border: '1px solid #e1e4e8'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <CheckOutlined style={{ color: '#52c41a' }} />
              <span style={{ fontWeight: 500 }}>导出预览</span>
            </div>
            <div style={{ color: '#666', fontSize: 14 }}>
              预计导出 {totalItems} 条数据
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ExportTools; 