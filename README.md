# Zekiel · Personal Lab

一个为 Technical Artist / Creative Technologist 设计的长期个人网站。作品展示、实验记录和数字花园共用一套克制的暗色设计系统。

**所有初始作品、Lab 条目、文章和书架均为明确标注的示例。** About 和 Now 的初稿基于给定的兴趣画像；没有虚构公司、履历、完成项目或投资持仓。正式姓名、邮箱和位置需要你自行填写。

## 技术栈

Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS 4 · 本地 MDX · Lucide。默认 Server Components，只有导航、搜索和筛选使用客户端交互。字体使用本地 Inter Variable + IBM Plex Mono，无需访问 Google Fonts。

静态导出到 `out/`，支持 GitHub Pages、Vercel 和普通静态托管。不依赖数据库、CMS、运行时密钥或服务器 API。

## 本地开发

需要 Node.js 24 和 npm（`.nvmrc` 已配置）。

```sh
npm install
npm run dev
```

开发地址为 `http://localhost:3000`。已存在 lockfile 时，CI 和可重复安装使用 `npm ci`。

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run preview
```

`preview` / `start` 服务生产静态文件，支持 gzip、哈希资源缓存，并保留真实的自定义 404 行为。设置 `PORT=3001` 可以改变预览端口。`next start` 不适用于静态导出，因此没有用它作为启动命令。

浏览器检查覆盖所有主页面、所有项目和文章详情、内部链接、图片、响应式布局、筛选、搜索、移动导航和 404：

```sh
# 先在另一个终端启动 dev 或 preview
npm run test:e2e
# 可选覆盖：BASE_URL=http://localhost:3001 npm run test:e2e
```

浏览器测试使用系统 Chromium，默认 `/usr/bin/chromium`。其他系统通过 `CHROMIUM_PATH` 设置路径。截图写入忽略的 `verification/` 目录。无浏览器的 CI 仍运行 lint、typecheck、内容测试和生产构建。

## 页面

| URL | 用途 |
| --- | --- |
| `/` | 个人入口、精选作品、开放探索和近期笔记 |
| `/work/` | 可筛选作品集 |
| `/work/[slug]/` | 技术拆解与下一作品 |
| `/lab/` | 实验、原型和问题索引 |
| `/notes/` | 按分类筛选的数字花园 |
| `/notes/[category]/[slug]/` | MDX 文章、目录、代码和表格 |
| `/about/` | 背景、兴趣和工作方式 |
| `/now/` | 可随时更新的当前关注 |
| `/reading/` | 简洁书架 |

## 目录结构

```text
app/                 页面、布局、metadata、sitemap、robots、404
components/          导航、搜索、筛选、作品和文章组件
content/notes/       自动发现的 MDX 内容
data/                作品、Lab、书架
lib/                 内容读取、URL、目录锚点、SEO 辅助
public/images/       可替换的作品示意图和社交分享图
scripts/             浏览器验证、静态预览、OG 图片生成
styles/globals.css   设计 token、排版与响应式规则
tests/               内容系统测试
types/               内容类型
site.config.ts       个人信息和导航配置
.github/workflows/   检查及 GitHub Pages 部署
```

## 新增 Project

1. 将图片放到 `public/images/`（建议 WebP/AVIF；适合图表的 SVG 也可以）。
2. 在 `data/projects.ts` 添加一个对象，遵循 `types/content.ts` 的 `Project` 类型。
3. 设置唯一 `slug`、标题、分类、年份、简介、技术栈、图片路径和有意义的 `imageAlt`。
4. 用 `sections` 添加 Problem / Research / Approach / Implementation / Result / Lessons 等拆解。
5. 将 `status` 设为 `Published` 或 `In progress`；初始占位作品使用 `Sample`。`imageCaption` 可填写真实图片说明。组件会自动更新状态标签和示例提示。
6. 运行 `npm test` 和 `npm run build`。作品索引、详情、站内搜索及 sitemap 自动更新。

图片引用使用 `/images/filename.webp`，页面会通过 `assetPath()` 自动补上部署子路径。静态模式下 `next/image` 保留尺寸和懒加载，运行时图片优化关闭；替换为照片时请提前压缩并控制尺寸。

## 新增 Note

只需要在 `content/notes/<category>/` 添加 `<slug>.mdx`，不用登记路由：

```mdx
---
title: Your note title
description: A concise summary.
date: '2026-10-07'
tags: [Rendering, Unreal Engine]
sample: false
---

Your introduction.

## The question

Your findings, code, images, and references.
```

生成 URL：`/notes/<category>/<slug>/`。支持 Markdown、GFM 表格、代码块和 MDX；`##` 标题自动生成目录锚点。中文与英文目录标题均支持锚点；请保持同一文章的目录标题唯一。

Markdown 图片也会自动补上部署子路径并使用 `next/image`；对宽高比例特殊的图片，可在 MDX 中写带 `width` / `height` 的 `<img>`，保持布局稳定。

内容是**可信的仓库文件**，在构建时执行。不要把未经审查的用户上传 MDX 接入这个编译流程。日期使用带引号的 `YYYY-MM-DD`，`sample` 必须显式为布尔值。

真实文章使用 `sample: false`，样例文章使用 `sample: true`。内容测试会验证标记为样例的文章保留明确说明。

## 修改个人信息

编辑 `site.config.ts`：

- `name`：默认 `YOUR_NAME`，尚未展示真实姓名。
- `alias`：站点品牌，当前以仓库名 `Zekiel` 为可编辑 alias。
- `title` / `description`：职业描述与站点简介。
- `github` / `email` / `social` / `location`：公开联系信息，空项不渲染。
- `navigation`：主导航。

更新 About、`app/now/page.tsx` 和 `data/reading.ts`，让内容对应你自己的情况。书架条目支持 `Example`、`Reading`、`Read`、`Recommended` 状态。OG 分享图放在 `public/images/og.png`；修改 alias 后，在有 Chromium 的环境运行 `npm run generate:og` 重新生成。可编辑源图是 `public/images/og.svg`。

复制 `.env.example` 为 `.env.local`：

```dotenv
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_BASE_PATH=
```

`NEXT_PUBLIC_SITE_URL` 只填 origin，不带仓库路径。GitHub 项目 Pages 的路径用 `NEXT_PUBLIC_BASE_PATH=/REPOSITORY_NAME`。这些是公开构建配置，不是密钥。正式部署前必须替换默认 `example.com`；canonical、sitemap、robots 和分享 URL 都从这些配置生成。

## GitHub Pages 部署

已有 `.github/workflows/deploy.yml`。推送 `main` 后先运行 lint、typecheck、测试和构建，再部署 `out/`。

1. 在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
2. 推送 `main`，或在 Actions 中手动运行 `Validate and deploy to GitHub Pages`。
3. 等待部署任务成功，再使用其输出的 Pages 地址。

工作流自动设置 `https://OWNER.github.io` 和 `/REPOSITORY_NAME`。更换仓库名称无需改代码。如果以后改为 `OWNER.github.io` 用户级仓库，把工作流的 `NEXT_PUBLIC_BASE_PATH` 改为空；自定义域名也应相应调整 URL 和路径。

未选择 Actions 作为 Pages 来源时，部署阶段可能失败；这不会影响网站构建。不要把预测的 URL 当作已上线的证据。

## Vercel 部署

导入仓库，框架选择 Next.js，构建命令为 `npm run build`。设置 `NEXT_PUBLIC_SITE_URL` 为真实域名，`NEXT_PUBLIC_BASE_PATH` 留空。当前是标准 Next.js 静态导出；需要 SSR、Server Actions 等能力时可以移除 `output: 'export'` 并使用服务器部署。

## 设计约定

- 暖灰黑底 + 单一低饱和绿色，颜色集中在 CSS token。
- Sans 承载标题与阅读，Mono 承载索引与元信息。
- 作品以技术图为主；Lab 和 Notes 使用有密度的编辑式列表。
- 小幅过渡、原生滚动，没有 WebGL、滚动劫持或鼠标跟随。
- 尊重 `prefers-reduced-motion`；原生 dialog 保持键盘焦点；可见 focus、skip link、语义化标题和图片 alt。
- 示例图为原创几何示意，不代表真实项目截图。

测量与审查结果见 `docs/verification.md`。Lighthouse 为本地实验室结果，实际托管与真实图片可能改变分数。
