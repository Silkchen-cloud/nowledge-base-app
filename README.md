# 智算科技行业研究中心知识库

## 项目状态 ✅

**当前系统运行状态良好**：
- ✅ 后端服务器：运行在端口 3001
- ✅ 前端应用：运行在端口 3000  
- ✅ 数据抓取：45条真实AI新闻数据
- ✅ 每周要闻：10条热点新闻已生成
- ✅ 芯片政策：8条政策数据完整

## 功能特性

### 🗞️ 新闻管理
- **实时抓取**：从14个权威科技媒体源抓取AI相关新闻
- **智能分类**：自动分类为AI应用、智能芯片、具身智能、算力政策等
- **热度评分**：基于关键词权重和来源权威性计算新闻热度
- **搜索筛选**：支持关键词、分类、时间范围、来源等多维度筛选

### 📊 每周要闻
- **自动生成**：每周自动生成AI领域热点新闻汇总
- **热度排序**：按热度分数排序，突出重要新闻
- **分类统计**：按分类展示新闻分布
- **数据可视化**：提供统计图表和趋势分析

### 🏛️ 芯片政策
- **政策库**：完整的美国芯片出口监管政策数据库
- **搜索功能**：支持关键词搜索和政策筛选
- **时间线**：按时间顺序展示政策发展历程
- **影响分析**：标注政策对中国和全球的影响

### 📈 数据可视化
- **实时统计**：新闻数量、分类分布、热度趋势
- **图表展示**：柱状图、饼图、趋势线等多种可视化
- **交互功能**：支持图表交互和数据钻取

### 🔧 工具功能
- **数据导出**：支持Excel、PDF、CSV等多种格式导出
- **通知中心**：系统通知和更新提醒
- **用户设置**：个性化配置和偏好设置

## 技术架构

### 后端 (Node.js + Express)
```
server/
├── server.js          # 主服务器文件
├── data/             # 数据存储目录
│   ├── ai_news.json      # 新闻数据
│   ├── chip_policies.json # 芯片政策数据
│   └── weekly_summary.json # 每周要闻数据
```

### 前端 (React + TypeScript + Ant Design)
```
src/
├── components/        # 可复用组件
├── pages/            # 页面组件
├── services/         # API服务
├── styles/           # 样式文件
└── templates/        # 模板文件
```

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 启动后端服务器
```bash
cd server
node server.js
```
服务器将在 http://localhost:3001 运行

### 3. 启动前端应用
```bash
npm start
```
应用将在 http://localhost:3000 运行

## API接口

### 新闻相关
- `GET /api/news` - 获取所有新闻
- `POST /api/fetch-news` - 手动触发新闻抓取
- `GET /api/stats` - 获取数据统计

### 每周要闻
- `GET /api/weekly-summary` - 获取每周要闻
- `POST /api/generate-weekly-summary` - 手动生成每周要闻

### 芯片政策
- `GET /api/chip-policies` - 获取所有政策
- `GET /api/chip-policies/search?keyword=xxx` - 搜索政策

## 数据源

系统从以下14个权威科技媒体源抓取AI相关新闻：

1. **Reuters AI** - 路透社AI频道
2. **BBC Technology** - BBC科技频道  
3. **CNBC Technology** - CNBC科技频道
4. **The Guardian Technology** - 卫报科技频道
5. **TechCrunch** - 科技博客
6. **VentureBeat** - 风险投资新闻
7. **MIT Technology Review** - MIT科技评论
8. **Ars Technica** - 科技新闻网站
9. **Wired AI** - Wired AI频道
10. **The Verge AI** - The Verge AI频道
11. **Engadget** - 科技博客
12. **Gizmodo** - 科技博客
13. **Mashable** - 科技新闻
14. **Digital Trends** - 数字趋势

## 定时任务

- **新闻抓取**：每周一、周三早上9点自动抓取
- **每周要闻**：每周自动生成热点新闻汇总
- **数据备份**：定期备份重要数据

## 部署说明

### 开发环境
```bash
# 开发模式
npm start

# 构建生产版本
npm run build
```

### 生产环境
项目已配置Vercel部署，支持自动部署和CDN加速。

## 系统监控

- **健康检查**：`GET /health`
- **数据统计**：`GET /api/stats`
- **错误日志**：控制台输出详细错误信息

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License

---

**最后更新**：2025年8月6日  
**版本**：v1.0.0  
**状态**：✅ 运行正常
