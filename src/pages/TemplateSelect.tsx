import React from "react";
import { Card, Row, Col, Button } from "antd";
import aiProductSolution from "../templates/aiProductSolution";
import aiIndustryReport from "../templates/aiIndustryReport";
import aiInvestmentReport from "../templates/aiInvestmentReport";

const templates = [
  aiProductSolution,
  aiIndustryReport,
  aiInvestmentReport,
];

type TemplateSelectProps = {
  onSelect: (tpl: any) => void;
};

const TemplateSelect: React.FC<TemplateSelectProps> = ({ onSelect }) => (
  <div style={{ padding: 32 }}>
    <h2 style={{ marginBottom: 24, color: '#222B45', fontSize: 28, fontWeight: 600 }}>
      智算科技行业研究中心 - 选择知识库模板
    </h2>
    <Row gutter={24}>
      {templates.map((tpl, idx) => (
        <Col span={8} key={tpl.name}>
          <Card
            title={tpl.name}
            bordered={false}
            style={{ 
              marginBottom: 24, 
              minHeight: 320,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              borderRadius: 12,
              transition: 'all 0.3s ease'
            }}
            hoverable
            cover={
              <div
                style={{
                  height: 120,
                  background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  color: "#fff",
                  fontWeight: 700,
                  letterSpacing: 2,
                  borderRadius: '12px 12px 0 0'
                }}
              >
                {tpl.name.slice(0, 4)}
              </div>
            }
          >
            <p style={{ color: '#666', lineHeight: 1.6, marginBottom: 16 }}>
              {tpl.description}
            </p>
            <Button 
              type="primary" 
              size="large"
              onClick={() => onSelect(tpl)}
              style={{ 
                width: '100%',
                height: 40,
                borderRadius: 8,
                fontWeight: 500
              }}
            >
              使用此模板
            </Button>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

export default TemplateSelect; 