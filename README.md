[![CVAT Community header](site/content/en/images/cvat_github_header.webp)](https://app.cvat.ai)
# CVAT：计算机视觉标注工具

[![Release][release-img]][release-url]
[![GitHub stars][stars-img]][stars-url]
[![License][license-img]][license-url]
[![CI][ci-img]][ci-url]
[![server pulls][docker-server-pulls-img]][docker-server-image-url]
[![ui pulls][docker-ui-pulls-img]][docker-ui-image-url]
[![CVAT Online][online-img]][online-url]
[![CVAT Enterprise][enterprise-img]][enterprise-url]
[![Status][status-img]][status-url]
[![Discord][discord-img]][discord-url]
[![Docs][docs-img]][docs-url]

[官网](https://www.cvat.ai/) ·
[文档](https://docs.cvat.ai/docs/) ·
[更新日志](https://www.cvat.ai/resources/changelog) ·
[教程](https://www.cvat.ai/resources/videos) ·
[学院](https://www.cvat.ai/resources/academy) ·
[博客](https://www.cvat.ai/resources/blog)

## 什么是 CVAT Community？

**CVAT Community** 是 [CVAT](https://www.cvat.ai/) 的免费、可自托管开源版本，是构建计算机视觉与视觉 AI 高质量数据集时最广泛使用的标注平台之一。自 2018 年以来，CVAT 已成为计算机视觉领域最知名的标注工具之一，拥有活跃的开源社区、数百万次 Docker 拉取量，并在科研与生产 AI 团队中被广泛采用。

CVAT Community 支持图像、视频和 3D 标注，提供数据集管理、团队协作、云存储集成，以及便于开发者使用的 SDK 与 API，让团队完全掌控数据与标注基础设施。该平台是 [CVAT Online](https://www.cvat.ai/pricing/cvat-online) 与 [CVAT Enterprise](https://www.cvat.ai/enterprise) 的基础，并由 CVAT 工程团队持续维护。

团队选择 CVAT Community 的原因：

- **数据自主：** 完全运行在自己的基础设施中，数据不会离开你的环境。
- **AI 辅助标注：** 接入自有的检测、分割、跟踪模型，加速标注流程。
- **团队协作：** 支持多用户、多组织，提供角色、任务分配与审核工作流。
- **MIT 开源核心：** 可在宽松的 MIT 许可证下使用、修改与分发 CVAT Community。部分 serverless 资源与依赖可能适用其他许可证。
- **生产级可靠：** 所有 CVAT 商业产品的基础，已在规模化场景中验证。
- **真正的开源：** 开发过程透明，社区活跃，自 2018 年起托管于 GitHub。

本仓库包含 CVAT Community 的源代码与部署资源。

如需全托管方案、标注服务或企业级功能，请参阅 [CVAT Online](https://www.cvat.ai/pricing/cvat-online)、[CVAT Enterprise](https://www.cvat.ai/enterprise) 与 [CVAT 标注服务](https://www.cvat.ai/annotation-services)。

## 快速开始

> 💡 想在部署之前先体验 CVAT？
> 可直接在浏览器中 **[试用 CVAT Online（免费计划）](https://app.cvat.ai)**。
> 各计划的功能与使用限制不同，详见 [CVAT Online 定价](https://www.cvat.ai/pricing/cvat-online)。

### 安装

**前置条件：**

- [Docker Engine](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)

> 💡 CVAT 主要在基于 Chromium 的浏览器（Google Chrome、Microsoft Edge）上测试。
> Firefox 可能可用但存在部分限制；不支持 Safari/WebKit。

**1. 启动默认服务栈**

克隆仓库并启动服务。

```bash
git clone https://github.com/cvat-ai/cvat
cd cvat

# 可选：设置你的 IP 或域名
# export CVAT_HOST=your-ip-or-domain

docker compose up -d
```

**2. 创建管理员账户**

```bash
docker exec -it cvat_server bash -ic 'python3 ~/manage.py createsuperuser'
```

完整安装说明及各操作系统配置，请参阅 [安装指南](https://docs.cvat.ai/docs/administration/community/basics/installation/)。

**3. 登录并开始标注**

- 在浏览器中打开 [http://localhost:8080](http://localhost:8080)（或你的 `CVAT_HOST`）。
- 使用超级用户账户登录。
- 创建项目或任务，上传数据（图像、视频或点云），定义标签后即可开始标注。

更多标注工具与工作流说明，请参阅 [CVAT 文档](https://docs.cvat.ai/docs/) 或免费课程 [CVAT Academy](https://www.cvat.ai/resources/academy)。

其他部署方式（AWS、Kubernetes、外部 PostgreSQL、备份、升级等），请参阅 [部署指南](https://docs.cvat.ai/docs/administration/community/advanced/)。

### 前端开发（热更新）

当你修改 `cvat-ui` 并希望在浏览器中**立即**看到效果、且无需每次重建 `cvat_ui` Docker 镜像时，使用此工作流。

**架构：** 后端用 Docker 运行，前端在本机启动 dev server。Webpack 在 **3000** 端口提供 UI 热更新，并将 API 请求代理到 Docker 后端的 **8080** 端口。

```text
浏览器 (:3000) → webpack-dev-server → 代理 /api/* → traefik (:8080) → cvat_server
```

**前置条件：**

- 已完成上方 [安装](#安装) 中的 Docker 服务栈
- [Node.js](https://nodejs.org/) 20+ 与 [Yarn](https://yarnpkg.com/)（通过 `corepack enable yarn` 启用）

**1. 启动后端（Docker）**

```bash
cd cvat
docker compose up -d

# 可选：停止 Docker UI 容器，避免与本机 dev server 混淆
docker compose stop cvat_ui
```

**所需后端服务**（`docker compose up -d` 会自动启动）：

| 服务 | 作用 |
| --- | --- |
| `traefik` | 8080 端口的 API 网关 |
| `cvat_server` | REST API |
| `cvat_db`、`cvat_redis_inmem`、`cvat_redis_ondisk`、`cvat_clickhouse`、`cvat_opa` | 核心依赖 |
| `cvat_worker_*` | 异步任务（导入、导出等），建议保留 |

此工作流**不需要** `cvat_ui` 容器。

**2. 安装前端依赖（仅首次）**

```bash
yarn install
```

**3. 启动前端 dev server**

若 `CVAT_HOST` 为 `localhost`（默认），或在 `.env` 中设置为 `CVAT_HOST=localhost`：

```bash
yarn run start:cvat-ui:docker
```

打开 [http://localhost:3000](http://localhost:3000)。修改 `cvat-ui/src/` 下的文件并保存即可触发刷新。

若 `CVAT_HOST` 为自定义 IP 或域名（例如 `.env` 中的 `192.168.0.13`），需将 dev server 代理指向该地址：

```bash
cd cvat-ui
npx webpack serve \
  --env API_URL=http://192.168.0.13:8080 \
  --config ./webpack.config.js \
  --mode=development
```

请将 `192.168.0.13` 替换为你的 `CVAT_HOST` 值。

**日常开发流程**

```bash
docker compose up -d
docker compose stop cvat_ui          # 可选
yarn run start:cvat-ui:docker        # 或使用上方自定义 API_URL 命令
```

**常见问题**

| 现象 | 原因 | 解决方法 |
| --- | --- | --- |
| `ECONNREFUSED localhost:7000` | 默认 `yarn run start:cvat-ui` 期望本机 Django 在 7000 端口 | 使用 `yarn run start:cvat-ui:docker`，或将 `API_URL` 设为 8080 端口 |
| 8080 端口 API 返回 404 | `CVAT_HOST` 不是 `localhost` | 将 `API_URL` 设为 `http://<CVAT_HOST>:8080` |
| UI 修改未生效 | 浏览器访问的是 8080（Docker UI） | 本地开发请使用 **3000** 端口 |
| 重建很慢 | 每次改动都执行 `docker compose build cvat_ui` | 开发阶段使用 dev server；仅在部署时重建 UI 镜像 |

**其他开发模式**

| 模式 | 适用场景 | 访问地址 |
| --- | --- | --- |
| 本机 UI + Docker 后端（推荐，改前端） | 前端热更新 | `http://localhost:3000` |
| Docker 全栈 | 验证部署、不改 UI | `http://localhost:8080`（或你的 `CVAT_HOST`） |
| 本机 UI + 本机 Django 后端 | 全栈本地调试 | `yarn run start:cvat-ui`（API 在 7000 端口），见 [开发环境](https://docs.cvat.ai/docs/contributing/development-environment/) |

UI 相关命令详见 [`cvat-ui/README.md`](cvat-ui/README.md)。

## 核心能力

- **[手动与自动标注](https://docs.cvat.ai/docs/annotation/manual-annotation/)：** 使用边界框、多边形、掩码、关键点、立方体、标签等标注图像、视频与 3D 点云；接入自有模型实现自动标注。
- **[任务管理](https://docs.cvat.ai/docs/workspace/)：** 将数据集组织为项目，拆分为任务与作业，分配给标注员并实时跟踪进度。
- **[协作](https://docs.cvat.ai/docs/account_management/user-roles/)：** 创建组织、邀请成员、分配角色，通过评论与 issue 协作标注。
- **[质量控制](https://docs.cvat.ai/docs/qa-analytics/manual-qa/)：** 审核标注、标记问题，通过共识对比标注员结果，并通过服务端 API 运行 Ground Truth 与 Honeypot 检查。
- **[分析](https://docs.cvat.ai/docs/administration/community/advanced/analytics/)：** 通过 Grafana 仪表盘监控用户活动、作业工时、事件与服务端日志。
- **[数据操作与集成](https://docs.cvat.ai/docs/dataset_management/export-datasets/)：** 支持 20+ 种格式导入/导出（COCO、YOLO、Pascal VOC、KITTI 等），连接云存储（S3、Azure、Google Cloud），并通过 REST API 与 Python SDK 自动化。

高级能力（如高级项目分析、质量控制 UI、内置 SAM 2 / SAM 3 自动标注、AI Agent、SSO 等）可在 [CVAT Online](https://www.cvat.ai/pricing/cvat-online) 付费计划（Solo、Team）与 [CVAT Enterprise](https://www.cvat.ai/enterprise) 中使用。

## 开发者工具

CVAT 面向自动化集成设计。除 Web UI 外，还可通过以下方式接入流水线：

- [Python SDK](https://docs.cvat.ai/docs/api_sdk/sdk/)：执行 `pip install cvat-sdk`，在 Python 中自动化创建任务、上传与导出。
- [命令行工具](https://docs.cvat.ai/docs/api_sdk/cli/)：执行 `pip install cvat-cli`，在终端脚本化常见 CVAT 工作流。
- [REST API](https://docs.cvat.ai/docs/api_sdk/api/)：对 CVAT 进行完整的程序化控制。

## 数据与格式

CVAT Community 支持图像、视频与 3D（点云）标注工作流。可通过 20+ 种行业标准格式导入/导出：CVAT (XML)、COCO (JSON)、YOLO (TXT)、Ultralytics YOLO (TXT/YAML)、Pascal VOC (XML)、KITTI (TXT)、MOT (TXT) 等。

[完整支持格式列表。](https://docs.cvat.ai/docs/dataset_management/formats/)

## 机器学习与 AI 模型

CVAT Community 通过基于 Nuclio 的预构建 serverless 模型支持自动标注，涵盖检测、分割、姿态估计与跟踪：

| 模型 | 框架 | 类型 |
| --- | --- | --- |
| [Segment Anything (SAM)](https://github.com/cvat-ai/cvat/tree/develop/serverless/pytorch/facebookresearch/sam/nuclio) | PyTorch | Interactor |
| [Inside-Outside Guidance (IOG)](https://github.com/cvat-ai/cvat/tree/develop/serverless/pytorch/shiyinzhang/iog/nuclio) | PyTorch | Interactor |
| [RetinaNet R101](https://github.com/cvat-ai/cvat/tree/develop/serverless/pytorch/facebookresearch/detectron2/retinanet_r101/nuclio) | PyTorch | Detector |
| [HRNet32 Whole Body Pose](https://github.com/cvat-ai/cvat/tree/develop/serverless/pytorch/mmpose/hrnet32/nuclio) | PyTorch | Pose Estimation |
| [TransT](https://github.com/cvat-ai/cvat/tree/develop/serverless/pytorch/dschoerk/transt/nuclio) | PyTorch | Tracker |
| [YOLO v7](https://github.com/cvat-ai/cvat/tree/develop/serverless/onnx/WongKinYiu/yolov7/nuclio) | ONNX | Detector |
| [Mask RCNN Inception ResNet v2](https://github.com/cvat-ai/cvat/tree/develop/serverless/openvino/omz/public/mask_rcnn_inception_resnet_v2_atrous_coco/nuclio) | OpenVINO | Detector |
| [Face Detection 0205](https://github.com/cvat-ai/cvat/tree/develop/serverless/openvino/omz/intel/face-detection-0205/nuclio) | OpenVINO | Detector |
| [Faster RCNN Inception v2](https://github.com/cvat-ai/cvat/tree/develop/serverless/tensorflow/faster_rcnn_inception_v2_coco/nuclio) | TensorFlow | Detector |

启用自动标注时，在部署中加入 serverless 组件：

```bash
docker compose -f docker-compose.yml -f components/serverless/docker-compose.serverless.yml up -d
```

这将启动 serverless 基础设施。要在 CVAT 中使用模型，需安装 `nuctl` 并部署所需函数（如 SAM 或 YOLO），详见 [自动标注指南](https://docs.cvat.ai/docs/annotation/auto-annotation/automatic-annotation/)。

## 如何选择 CVAT 版本？

- **CVAT Online：** 无需部署即可最快体验 CVAT 并开始标注。适合在浏览器中评估 CVAT、探索托管功能，并在需要更大容量或团队工作流时升级到性价比更高的付费计划。
- **CVAT Community：** MIT 许可的自托管版本，适合希望自行运行 CVAT、定制技术栈并掌控基础设施的团队。
- **CVAT Enterprise：** 适合需要在自有云或内网环境部署 CVAT、需要企业支持、SSO 等安全控制、付费平台功能与 SLA 的组织。
- **Labeling Services（标注服务）：** 适合希望将标注工作外包给 CVAT.ai 专业标注团队、而非自建标注团队的客户。项目期间客户可获得 CVAT Online 试用访问。

各计划的详细限制与功能可用性，请参阅 [CVAT Online 定价](https://www.cvat.ai/pricing/cvat-online)、[CVAT Enterprise](https://www.cvat.ai/enterprise) 与 [标注服务](https://www.cvat.ai/annotation-services)。

## 支持

- **使用问题：** 在 [Discord](https://discord.com/invite/fNR3eXfk6C) 社区提问，或在 Stack Overflow 使用 `cvat` 标签。
- **Bug 与功能请求：** 使用 [GitHub Issues](https://github.com/cvat-ai/cvat/issues)。
- **FAQ：** [安装、升级、故障排查](https://docs.cvat.ai/docs/faq/)。

如需专属支持、SLA 或高级部署方案，可考虑 [CVAT Enterprise](https://www.cvat.ai/enterprise)。

## 贡献

欢迎各类贡献：Bug 报告、文档修复、集成与代码。

- 参与贡献请参阅 [贡献文档](https://docs.cvat.ai/docs/contributing/)。
- Bug 报告与功能请求请使用 [GitHub Issues](https://github.com/cvat-ai/cvat/issues)。

## 安全

- 报告漏洞前请先阅读 [安全策略](https://github.com/cvat-ai/cvat/security/policy)。
- 敏感问题请联系：[secure@cvat.ai](mailto:secure@cvat.ai)。

## 许可证

CVAT Community 基于 MIT 许可证发布。

- `/serverless` 目录下的代码同样为 MIT 许可，但可能包含适用其他许可证（含非商业许可）的第三方资源，使用前请查阅相应许可证。
- 本软件使用 LGPL/GPL 下的 FFmpeg 库。详见 Dockerfile 与 [FFmpeg 法律信息](https://www.ffmpeg.org/legal.html)。

## 更多资源

最新产品发布、功能演示及 CVAT 相关内容：

<table cellspacing="10" border="0"><tr>
  <td><a href="https://www.cvat.ai/resources/blog"><img src="site/content/en/images/badge-blog.png" alt="CVAT Blog" height="120"/></a></td>
  <td><a href="https://www.cvat.ai/resources/academy"><img src="site/content/en/images/badge-academy.png" alt="CVAT Academy" height="120"/></a></td>
  <td><a href="https://www.cvat.ai/resources/case-studies"><img src="site/content/en/images/badge-case-studies.png" alt="Case Studies" height="120"/></a></td>
  <td><a href="https://www.youtube.com/@cvat-ai"><img src="site/content/en/images/badge-youtube.png" alt="YouTube" height="120"/></a></td>
  <td><a href="https://www.linkedin.com/company/cvat-ai"><img src="site/content/en/images/badge-linkedin.png" alt="LinkedIn" height="120"/></a></td>
</tr></table>

  <!-- Badges -->

[ci-img]: https://github.com/cvat-ai/cvat/actions/workflows/main.yml/badge.svg?branch=develop
[ci-url]: https://github.com/cvat-ai/cvat/actions

[docs-img]: https://img.shields.io/badge/docs-docs.cvat.ai-blue?style=flat-square
[docs-url]: https://docs.cvat.ai

[online-img]: https://img.shields.io/badge/CVAT%20Online-app.cvat.ai-success?style=flat-square
[online-url]: https://app.cvat.ai

[release-img]: https://img.shields.io/github/v/release/cvat-ai/cvat?style=flat-square
[release-url]: https://github.com/cvat-ai/cvat/releases

[license-img]: https://img.shields.io/github/license/cvat-ai/cvat?style=flat-square
[license-url]: https://github.com/cvat-ai/cvat/blob/develop/LICENSE

[stars-img]: https://img.shields.io/github/stars/cvat-ai/cvat?style=flat-square
[stars-url]: https://github.com/cvat-ai/cvat/stargazers

[status-img]: https://uptime.betterstack.com/status-badges/v2/monitor/1yl3h.svg
[status-url]: https://status.cvat.ai

[enterprise-img]: https://img.shields.io/badge/CVAT%20Enterprise-cvat.ai-orange?style=flat-square
[enterprise-url]: https://www.cvat.ai/enterprise

[docker-server-pulls-img]: https://img.shields.io/docker/pulls/cvat/server.svg?style=flat-square&label=server%20pulls
[docker-server-image-url]: https://hub.docker.com/r/cvat/server

[docker-ui-pulls-img]: https://img.shields.io/docker/pulls/cvat/ui.svg?style=flat-square&label=UI%20pulls
[docker-ui-image-url]: https://hub.docker.com/r/cvat/ui

[discord-img]: https://img.shields.io/discord/1000789942802337834?label=discord
[discord-url]: https://discord.gg/fNR3eXfk6C
