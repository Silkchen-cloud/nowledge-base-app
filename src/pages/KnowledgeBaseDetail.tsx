import React, { useState } from "react";
import { Layout, Typography, List, Card, Button, Input, Space, message } from "antd";
import { ArrowLeftOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { TextArea } = Input;

interface Section {
  title: string;
  content: string;
}

interface KnowledgeBaseDetailProps {
  template: {
    name: string;
    description: string;
    sections: Section[];
  };
  onBack: () => void;
}

const KnowledgeBaseDetail: React.FC<KnowledgeBaseDetailProps> = ({ template, onBack }) => {
  const [sections, setSections] = useState<Section[]>(template.sections);
  const [editingSection, setEditingSection] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const handleEdit = (index: number) => {
    setEditingSection(index);
    setEditContent(sections[index].content);
  };

  const handleSave = (index: number) => {
    const newSections = [...sections];
    newSections[index].content = editContent;
    setSections(newSections);
    setEditingSection(null);
    message.success("内容已保存");
  };

  const handleCancel = () => {
    setEditingSection(null);
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f7f9fb" }}>
      <Content style={{ padding: "24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ marginBottom: 24 }}>
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={onBack}
              style={{ marginBottom: 16 }}
            >
              返回模板选择
            </Button>
            <Title level={2} style={{ color: "#222B45", margin: 0 }}>
              {template.name}
            </Title>
            <Paragraph style={{ color: "#666", fontSize: 16, marginTop: 8 }}>
              {template.description}
            </Paragraph>
          </div>

          {/* Sections */}
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={sections}
            renderItem={(section, index) => (
              <List.Item>
                <Card
                  title={
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 18, fontWeight: 600, color: "#222B45" }}>
                        {section.title}
                      </span>
                      {editingSection === index ? (
                        <Space>
                          <Button 
                            type="primary" 
                            icon={<SaveOutlined />}
                            onClick={() => handleSave(index)}
                            size="small"
                          >
                            保存
                          </Button>
                          <Button onClick={handleCancel} size="small">
                            取消
                          </Button>
                        </Space>
                      ) : (
                        <Button 
                          icon={<EditOutlined />}
                          onClick={() => handleEdit(index)}
                          size="small"
                        >
                          编辑
                        </Button>
                      )}
                    </div>
                  }
                  style={{ 
                    borderRadius: 12,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                  }}
                >
                  {editingSection === index ? (
                    <TextArea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={6}
                      placeholder="请输入内容..."
                      style={{ marginTop: 16 }}
                    />
                  ) : (
                    <div style={{ 
                      minHeight: 100, 
                      padding: "16px 0",
                      color: section.content ? "#333" : "#999",
                      fontStyle: section.content ? "normal" : "italic"
                    }}>
                      {section.content || "暂无内容，点击编辑按钮添加内容..."}
                    </div>
                  )}
                </Card>
              </List.Item>
            )}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default KnowledgeBaseDetail; 