# 🚀 简单部署方案

## 方案一：直接拖拽部署（推荐）

### 步骤：
1. **打开Netlify**：https://app.netlify.com
2. **登录**：使用GitHub账户
3. **拖拽部署**：将 `build` 文件夹直接拖拽到Netlify部署区域
4. **等待部署**：通常需要1-2分钟
5. **获取URL**：部署完成后会显示类似 `https://random-name.netlify.app` 的URL

## 方案二：GitHub集成部署

### 步骤：
1. **在Netlify中**：
   - 点击 "New site from Git"
   - 选择 "GitHub"
   - 选择仓库：`Silkchen-cloud/nowledge-base-app`

2. **配置设置**：
   ```
   Build command: CI=false npm run build
   Publish directory: build
   ```

3. **点击 "Deploy site"**

## 方案三：Vercel部署（备选）

### 步骤：
1. **访问Vercel**：https://vercel.com
2. **导入GitHub仓库**：选择您的仓库
3. **自动部署**：Vercel会自动检测并部署

## 🔧 构建问题解决方案

如果遇到构建失败，请检查：

1. **环境变量**：
   ```
   CI=false
   NODE_VERSION=18
   ```

2. **构建命令**：
   ```bash
   CI=false npm run build
   ```

3. **发布目录**：
   ```
   build
   ```

## 📋 部署验证

部署成功后，请验证：
- ✅ 首页正常显示
- ✅ 新闻列表加载
- ✅ 每周要闻显示数据
- ✅ 搜索功能正常

## ⚠️ 重要提醒

1. **后端API**：目前前端会调用本地后端，生产环境需要部署后端
2. **环境变量**：需要配置正确的API地址
3. **CORS**：确保后端允许前端域名访问

---

**推荐使用方案一（拖拽部署）**，这是最简单可靠的方式！ 