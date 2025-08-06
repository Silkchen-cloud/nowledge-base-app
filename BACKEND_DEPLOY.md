# 🚀 后端部署指南

## 问题分析
前端现在调用相对路径 `/api/...`，但生产环境没有后端服务，所以显示模拟数据。

## 解决方案：部署后端到Railway

### 步骤1：准备后端代码
后端代码在 `server/` 目录中，已经配置好Railway部署。

### 步骤2：部署到Railway
1. **访问Railway**：https://railway.app
2. **使用GitHub登录**
3. **创建新项目**：
   - 点击 "New Project"
   - 选择 "Deploy from GitHub repo"
   - 选择仓库：`Silkchen-cloud/nowledge-base-app`

### 步骤3：配置部署
1. **设置根目录**：`server`
2. **启动命令**：`npm start`
3. **环境变量**：
   ```
   NODE_ENV=production
   PORT=3001
   ```

### 步骤4：获取后端URL
部署完成后，Railway会提供类似这样的URL：
```
https://your-app-name.railway.app
```

### 步骤5：配置前端API地址
在Netlify中设置环境变量：
```
REACT_APP_API_URL=https://your-app-name.railway.app/api
```

## 备选方案：Vercel部署后端

### 步骤1：访问Vercel
1. 访问 https://vercel.com
2. 使用GitHub登录

### 步骤2：导入项目
1. 点击 "New Project"
2. 选择仓库：`Silkchen-cloud/nowledge-base-app`
3. 设置根目录：`server`

### 步骤3：配置
- **Framework Preset**: Node.js
- **Root Directory**: server
- **Build Command**: `npm install`
- **Output Directory**: 留空

## 🔧 快速部署命令

### Railway CLI部署
```bash
# 安装Railway CLI
npm install -g @railway/cli

# 登录
railway login

# 部署
cd server
railway up
```

### Vercel CLI部署
```bash
# 安装Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
cd server
vercel --prod
```

## 📋 部署后验证

1. **后端API测试**：
   ```
   GET https://your-backend-url.com/api/news
   GET https://your-backend-url.com/api/weekly-summary
   GET https://your-backend-url.com/api/stats
   ```

2. **前端功能验证**：
   - ✅ 新闻列表显示真实数据
   - ✅ 每周要闻显示真实数据
   - ✅ 搜索功能正常
   - ✅ 芯片政策数据正常

## ⚠️ 重要提醒

1. **CORS配置**：确保后端允许前端域名访问
2. **环境变量**：前端需要配置正确的API地址
3. **数据抓取**：后端会自动抓取最新新闻数据

---

**推荐使用Railway部署后端**，这是最简单可靠的方式！ 