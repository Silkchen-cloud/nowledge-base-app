#!/bin/bash

echo "🚀 开始Netlify部署..."

# 检查是否安装了netlify-cli
if ! command -v netlify &> /dev/null; then
    echo "📦 安装Netlify CLI..."
    npm install -g netlify-cli
fi

# 构建项目
echo "🔨 构建项目..."
npm run build

# 检查构建是否成功
if [ ! -d "build" ]; then
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi

echo "✅ 构建成功！"

# 部署到Netlify
echo "🌐 部署到Netlify..."
netlify deploy --prod --dir=build

echo "🎉 部署完成！"
echo "📝 请访问您的Netlify URL查看部署结果" 