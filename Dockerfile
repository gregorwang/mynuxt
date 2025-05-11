# syntax=docker/dockerfile:1

# 构建阶段
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 首先只复制 package 文件以利用缓存
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制其余源代码
COPY . .

# 构建应用
RUN npm run build

# 生产阶段
FROM node:18-alpine

WORKDIR /app

# 只复制必要的文件
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./

# 设置环境变量
ENV HOST=0.0.0.0
ENV PORT=3082

EXPOSE 3082

# 启动命令
CMD ["node", ".output/server/index.mjs"]
