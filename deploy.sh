#!/bin/bash

echo "🚀 开始部署智算科技行业研究中心知识库..."

# 检查Git状态
echo "📋 检查Git状态..."
git status

# 提交所有更改
echo "💾 提交代码更改..."
git add .
git commit -m "feat: 准备部署 - 修复API调用和添加部署配置"

# 显示部署选项
echo ""
echo "🎯 部署选项："
echo "1. GitHub + Netlify (推荐)"
echo "2. GitHub + Vercel"
echo "3. Railway (支持后端)"
echo ""

echo "📝 部署步骤："
echo ""
echo "方案1 - GitHub + Netlify："
echo "1. 在GitHub创建仓库：https://github.com/new"
echo "2. 运行：git remote add origin https://github.com/YOUR_USERNAME/knowledge-base-app.git"
echo "3. 运行：git push -u origin main"
echo "4. 访问 https://netlify.com 导入仓库"
echo ""
echo "方案2 - GitHub + Vercel："
echo "1. 在GitHub创建仓库"
echo "2. 推送代码到GitHub"
echo "3. 访问 https://vercel.com 导入仓库"
echo ""
echo "方案3 - Railway："
echo "1. 访问 https://railway.app"
echo "2. 使用GitHub登录"
echo "3. 创建新项目并导入仓库"
echo "4. 设置环境变量：NODE_ENV=production"
echo ""

echo "✅ 代码已准备就绪，请选择部署方案！" 