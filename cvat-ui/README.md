# cvat-ui 模块

## 简介

基于 React、Redux 和 Ant Design 的计算机视觉标注工具（CVAT）客户端 UI。

## 命令

- 安装依赖（在仓库根目录执行）：

```bash
yarn install
```

- 启动开发 UI 服务器，修改后自动重建（本机 Django 后端，7000 端口）：

```bash
yarn run start
```

- 启动开发 UI 服务器，对接 Docker 后端（8080 端口，**推荐用于前端开发**）：

```bash
# 在仓库根目录（CVAT_HOST=localhost）
yarn run start:cvat-ui:docker

# 或在本目录
yarn run start:docker
```

若根目录 `.env` 中的 `CVAT_HOST` 为自定义 IP 或域名，需显式指定 `API_URL`：

```bash
npx webpack serve \
  --env API_URL=http://YOUR_CVAT_HOST:8080 \
  --config ./webpack.config.js \
  --mode=development
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000)。

完整工作流（需启动哪些 Docker 服务、日常步骤、故障排查）请参阅根目录 README 的 [前端开发（热更新）](../README.md#前端开发热更新) 章节。

- 从源码构建，输出到 `dist` 目录：

```bash
yarn run build
yarn run build --mode=development     # 不压缩
```

**注意：** UI 所需的数据（任务、用户、标注等）均来自 CVAT 服务端。启动 dev server 前请确保后端已在运行。
