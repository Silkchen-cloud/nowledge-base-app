# 🚀 Netlify 快速部署指南

## 方法一：拖拽部署（最简单）

1. **打开Netlify**：
   - 访问 https://app.netlify.com
   - 使用GitHub账户登录

2. **拖拽部署**：
   - 在Netlify Dashboard中，将 `build` 文件夹直接拖拽到部署区域
   - 等待部署完成

3. **获取URL**：
   - 部署完成后，您将获得一个类似 `https://random-name.netlify.app` 的URL

## 方法二：GitHub集成部署

1. **在Netlify中**：
   - 点击 "New site from Git"
   - 选择 "GitHub"
   - 选择仓库：`Silkchen-cloud/nowledge-base-app`

2. **配置部署设置**：
   ```
   Build command: npm run build
   Publish directory: build
   ```

3. **点击 "Deploy site"**

## 方法三：CLI部署

```bash
# 登录Netlify
npx netlify-cli login

# 部署
npx netlify-cli deploy --prod --dir=build
```

## 📋 部署后配置

### 1. 环境变量设置
在Netlify Dashboard中添加：
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

### 2. 重定向规则
确保添加以下重定向规则：
```
/*    /index.html   200
```

## ✅ 验证部署

部署成功后，请验证：
- ✅ 首页正常显示
- ✅ 新闻列表加载
- ✅ 每周要闻显示数据
- ✅ 搜索功能正常

## 🔗 您的仓库地址
https://github.com/Silkchen-cloud/nowledge-base-app

## 📝 注意事项

1. **后端API**：目前前端会调用本地后端，生产环境需要部署后端
2. **环境变量**：需要配置正确的API地址
3. **CORS**：确保后端允许前端域名访问

---

**推荐使用方法一（拖拽部署）**，这是最简单快速的方式！ 