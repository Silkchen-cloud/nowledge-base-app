import React, { useState } from "react";
import { ConfigProvider, Layout, Menu } from "antd";
import { customTheme } from "./styles/theme";
import TemplateSelect from "./pages/TemplateSelect";
import KnowledgeBaseDetail from "./pages/KnowledgeBaseDetail";
import HomePage from "./pages/HomePage";
import { PlusOutlined, HomeOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

type PageType = 'home' | 'templates' | 'detail';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    setCurrentPage('detail');
  };

  const handleBack = () => {
    setSelectedTemplate(null);
    setCurrentPage('templates');
  };

  const handleHomeClick = () => {
    setCurrentPage('home');
    setSelectedTemplate(null);
  };

  const handleTemplatesClick = () => {
    setCurrentPage('templates');
    setSelectedTemplate(null);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'templates':
        return <TemplateSelect onSelect={handleTemplateSelect} />;
      case 'detail':
        return selectedTemplate ? (
          <KnowledgeBaseDetail 
            template={selectedTemplate} 
            onBack={handleBack} 
          />
        ) : null;
      default:
        return <HomePage />;
    }
  };

  return (
    <ConfigProvider theme={customTheme}>
      <Layout style={{ minHeight: "100vh" }}>
        <Header 
          style={{ 
            background: "#fff", 
            boxShadow: "0 2px 8px #f0f1f2",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ 
              color: "#4F8CFF", 
              margin: 0, 
              fontWeight: 700, 
              fontSize: 24,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginRight: "48px"
            }}>
              🧠 智算科技行业研究中心知识库
            </h1>
            
            <Menu
              mode="horizontal"
              selectedKeys={[currentPage]}
              style={{ 
                border: 'none', 
                background: 'transparent',
                flex: 1
              }}
              items={[
                {
                  key: 'home',
                  icon: <HomeOutlined />,
                  label: '最新资讯',
                  onClick: handleHomeClick
                },
                {
                  key: 'templates',
                  icon: <PlusOutlined />,
                  label: '创建知识库',
                  onClick: handleTemplatesClick
                }
              ]}
            />
          </div>
        </Header>
        
        <Content style={{ background: "#f7f9fb" }}>
          {renderContent()}
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
