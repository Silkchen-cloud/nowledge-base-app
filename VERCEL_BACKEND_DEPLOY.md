# Vercel 后端部署指南

## 问题解决
您遇到的"public"目录错误是因为Vercel期望找到构建输出目录，但我们的Node.js后端没有构建步骤。

## 解决方案

### 1. 使用正确的配置文件
我们已经创建了 `vercel-backend.json` 配置文件，专门用于后端部署。

### 2. 部署步骤

#### 方法一：使用CLI部署（推荐）
```bash
# 确保在项目根目录
cd /Users/jiachen/knowledge-base-app

# 使用后端配置文件部署
npx vercel --prod --config vercel-backend.json
```

#### 方法二：手动部署
1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "New Project"
3. 导入您的GitHub仓库
4. 在项目设置中：
   - **Framework Preset**: 选择 "Node.js"
   - **Root Directory**: 保持默认（根目录）
   - **Build Command**: 留空（不需要构建）
   - **Output Directory**: 留空（不需要输出目录）
   - **Install Command**: `npm install`
   - **Development Command**: `npm run dev`

### 3. 环境变量配置
在Vercel项目设置中添加以下环境变量：
- `NODE_ENV`: `production`
- `PORT`: `3000`（Vercel会自动分配）

### 4. 验证部署
部署完成后，您会得到一个类似 `https://your-app.vercel.app` 的URL。

测试API端点：
```bash
curl https://your-app.vercel.app/api/news
curl https://your-app.vercel.app/api/weekly-summary
```

### 5. 更新前端配置
部署成功后，需要更新前端的API URL：

1. 在Netlify项目设置中添加环境变量：
   - `REACT_APP_API_URL`: `https://your-app.vercel.app/api`

2. 重新部署前端：
```bash
npx netlify-cli deploy --prod --dir=build
```

## 故障排除

### 如果仍然出现"public"目录错误：
1. 确保使用的是 `vercel-backend.json` 配置文件
2. 检查项目根目录是否有 `package.json`（Vercel需要这个文件）
3. 确保 `server/server.js` 文件存在

### 如果API调用失败：
1. 检查Vercel部署日志
2. 确认环境变量设置正确
3. 测试API端点是否可访问

## 完成后的状态
- 后端：部署在 Vercel (https://your-app.vercel.app)
- 前端：部署在 Netlify (https://silkknow.netlify.app)
- 数据：实时从后端API获取 