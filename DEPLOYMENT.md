# 🚀 部署指南

## GitHub部署步骤

### 1. 创建GitHub仓库
1. 访问 https://github.com/new
2. 仓库名称：`knowledge-base-app`
3. 选择 **Public**
4. 不要初始化README
5. 点击 "Create repository"

### 2. 连接本地仓库
```bash
# 添加远程仓库（替换YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/knowledge-base-app.git

# 推送代码
git branch -M main
git push -u origin main
```

### 3. Vercel部署

#### 方法A：Vercel Dashboard
1. 访问 https://vercel.com
2. 使用GitHub登录
3. 点击 "New Project"
4. 导入GitHub仓库
5. 自动部署

#### 方法B：Vercel CLI
```bash
# 安装CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel
```

### 4. 环境变量配置
在Vercel项目设置中添加：
```
NODE_ENV=production
PORT=3001
```

### 5. 部署验证
- ✅ 前端页面正常加载
- ✅ API接口正常响应
- ✅ 数据抓取功能正常
- ✅ 每周要闻生成正常

## 访问地址

部署成功后，您将获得：
- **生产环境**：`https://your-app-name.vercel.app`
- **GitHub仓库**：`https://github.com/YOUR_USERNAME/knowledge-base-app`

## 功能验证

### 1. 基础功能
- [ ] 首页正常显示
- [ ] 新闻列表加载
- [ ] 搜索功能正常
- [ ] 分类筛选正常

### 2. API接口
- [ ] `/api/news` - 新闻数据
- [ ] `/api/weekly-summary` - 每周要闻
- [ ] `/api/chip-policies` - 芯片政策
- [ ] `/api/stats` - 数据统计

### 3. 高级功能
- [ ] 数据可视化图表
- [ ] 导出工具
- [ ] 通知中心
- [ ] 用户设置

## 故障排除

### 常见问题

1. **API 404错误**
   - 检查Vercel路由配置
   - 确认server.js路径正确

2. **CORS错误**
   - 检查前端API请求地址
   - 确认后端CORS配置

3. **数据抓取失败**
   - 检查网络连接
   - 确认数据源可访问

4. **构建失败**
   - 检查package.json依赖
   - 确认Node.js版本兼容

## 维护指南

### 定期任务
- [ ] 检查数据抓取状态
- [ ] 监控API响应时间
- [ ] 更新依赖包
- [ ] 备份重要数据

### 性能优化
- [ ] 启用CDN缓存
- [ ] 优化图片加载
- [ ] 压缩静态资源
- [ ] 启用Gzip压缩

---

**最后更新**：2025年8月6日  
**状态**：待部署 