import React, { useState, useCallback } from 'react';
import { Input, Select, Space, Button, Card } from 'antd';
import { SearchOutlined, FilterOutlined, ClearOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

interface SearchFilters {
  keyword: string;
  category: string;
  dateRange: string;
  source: string;
}

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  onClear: () => void;
  categories: Array<{ id: string; name: string }>;
  sources: string[];
  loading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onClear,
  categories,
  sources,
  loading = false
}) => {
  const [filters, setFilters] = useState<SearchFilters>({
    keyword: '',
    category: 'all',
    dateRange: 'all',
    source: 'all'
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearch = useCallback(() => {
    onSearch(filters);
  }, [filters, onSearch]);

  const handleClear = useCallback(() => {
    setFilters({
      keyword: '',
      category: 'all',
      dateRange: 'all',
      source: 'all'
    });
    onClear();
  }, [onClear]);

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card 
      style={{ 
        marginBottom: 16, 
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {/* 主要搜索栏 */}
        <Search
          placeholder="搜索AI新闻标题、内容或关键词..."
          value={filters.keyword}
          onChange={(e) => handleInputChange('keyword', e.target.value)}
          onSearch={handleSearch}
          loading={loading}
          size="large"
          style={{ borderRadius: 8 }}
          enterButton={
            <Button 
              type="primary" 
              icon={<SearchOutlined />}
              size="large"
              style={{ borderRadius: '0 8px 8px 0' }}
            >
              搜索
            </Button>
          }
        />

        {/* 高级筛选 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button 
            type="link" 
            icon={<FilterOutlined />}
            onClick={() => setShowAdvanced(!showAdvanced)}
            style={{ padding: 0 }}
          >
            {showAdvanced ? '隐藏' : '显示'}高级筛选
          </Button>
          
          <Space>
            <Button 
              icon={<ClearOutlined />}
              onClick={handleClear}
              disabled={!filters.keyword && filters.category === 'all' && filters.dateRange === 'all' && filters.source === 'all'}
            >
              清除筛选
            </Button>
          </Space>
        </div>

        {/* 高级筛选选项 */}
        {showAdvanced && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: 16,
            padding: '16px 0',
            borderTop: '1px solid #f0f0f0'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#666' }}>
                分类筛选
              </label>
              <Select
                value={filters.category}
                onChange={(value) => handleInputChange('category', value)}
                style={{ width: '100%' }}
                placeholder="选择分类"
              >
                <Option value="all">全部分类</Option>
                {categories.map(cat => (
                  <Option key={cat.id} value={cat.id}>{cat.name}</Option>
                ))}
              </Select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#666' }}>
                时间范围
              </label>
              <Select
                value={filters.dateRange}
                onChange={(value) => handleInputChange('dateRange', value)}
                style={{ width: '100%' }}
                placeholder="选择时间范围"
              >
                <Option value="all">全部时间</Option>
                <Option value="today">今天</Option>
                <Option value="week">最近一周</Option>
                <Option value="month">最近一月</Option>
                <Option value="quarter">最近一季度</Option>
              </Select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#666' }}>
                来源筛选
              </label>
              <Select
                value={filters.source}
                onChange={(value) => handleInputChange('source', value)}
                style={{ width: '100%' }}
                placeholder="选择来源"
              >
                <Option value="all">全部来源</Option>
                {sources.map(source => (
                  <Option key={source} value={source}>{source}</Option>
                ))}
              </Select>
            </div>
          </div>
        )}
      </Space>
    </Card>
  );
};

export default SearchBar; 