# yuque-sdk
语雀开放能力开发工具包

## 开始研发

> 推荐使用 pnpm 作为包管理工具

### 快速启动

```bash
# 初始化依赖
pnpm i

# 运行 yuque-client 包的开发环境
pnpm dev:client

# 执行单测
pnpm test

# 执行构建
pnpm run build
```

### 其他命令

```bash
# 在顶层 package.json 添加 DEV 依赖
pnpm i -w -D <package name>

# 添加依赖到子包
pnpm add react react-dom --save-peer --filter <package name>
```

## 其他

### father 创建子包

```bash
# 创建 <folder name> 并初始化项目（采用 father 构建）
npx create-father <folder name>
```