# Verification & review

本地验证记录：2026-10-07。Node.js 24.19.0、Next.js 16.4.0、Chromium 151、Lighthouse 13.5.0。

## 已执行

- `npm install`，随后用 `npm ci` 验证 lockfile 可重复安装。
- `npm run lint`：通过，零警告。
- `npm run typecheck`：通过。
- `npm test`：8 个内容系统测试通过，没有跳过。涵盖资源、路由、样例标记、Lab 链接、实际 MDX 编译、目录锚点、部署 URL 和中文标题。
- `npm run build`：默认根路径和 GitHub Pages `/Zekiel` 子路径均成功静态导出。
- 实际启动 Next 开发服务器并检查全部 15 个内容页面。开发阶段发现的问题已修复，没有更改或禁用断言。
- 生产静态导出的浏览器检查通过：7 个主页 + 4 个项目详情 + 4 篇文章；320 / 390 / 768px 无整页横向溢出；桌面视口 1440px。
- 验证了项目 / Lab / Notes 筛选、Cmd/Ctrl+K 搜索、无结果状态、原生 dialog 焦点约束和焦点恢复、Esc 关闭、移动导航、GFM 表格、自定义 HTTP 404、15 个内部目标和图片加载。
- 浏览器没有 JavaScript 运行时或控制台错误；预期的 404 网络响应单独处理。
- axe-core：主页、Work、Lab、Notes、About、Now、Reading、一个作品详情和一篇文章的 WCAG 2 A/AA、WCAG 2.1 AA 与 best-practice 扫描，未发现违规。另行复查移动端 Notes 和搜索 dialog，未发现违规。自动扫描不能代替所有人工可访问性检查。

## Lighthouse

本地生产静态预览，使用 gzip、哈希资源缓存、Lighthouse 默认模拟限速。以下是实验室测量，不是线上真实用户数据，也不是对所有设备与未来内容的保证。

| 页面 / 模式 | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| 首页 / Mobile | 97 | 100 | 100 | 100 |
| 首页 / Desktop | 100 | 100 | 100 | 100 |
| Houdini MDX 文章 / Mobile | 99 | 100 | 100 | 100 |

首页 Mobile：LCP 2.6s、TBT 50ms、CLS 0.001。首轮无压缩传输的性能为 77；通过优化 SVG、传输压缩、静态缓存和图片优先级提高到上述结果。不是通过降低测试限速或删除检查来提高分数。

重新测量示例（先启动生产预览）：

```sh
CHROME_PATH=/usr/bin/chromium npx lighthouse http://localhost:3000/ \
  --chrome-flags='--headless --no-sandbox' \
  --output=json --output-path=verification/lighthouse-home-mobile.json
```

原始 Lighthouse / axe 结果与浏览器截图保存在忽略的 `verification/` 目录。更换图片或部署到实际托管后应重新测量；自托管需开启 gzip / Brotli 和合理缓存。

## 以首次访问者视角复查

- 首屏首先传达技术创作者身份，随后直接进入作品。不是履历时间线或营销卡片堆叠。
- 四个视觉均为原创技术示意：地形高度场、程序化建筑、光照测试、Agent 流程。未使用图库照片或冒充真实项目截图。
- 桌面、移动首屏、作品列表、文章目录与阅读宽度已实际截图审查。
- 暗色一致；单一低饱和绿色；Sans / Mono 分工明确；分隔线和列表承载高密度信息。
- 动画幅度小，尊重 reduced motion；没有粒子背景、重 WebGL、滚动劫持或 cursor follower。
- 示例与真实内容有数据级区分。个人姓名、邮箱、位置没有被虚构。
- 新增作品只需添加数据；新增文章只需添加 MDX。状态、搜索、详情路由和 sitemap 随内容更新。
- canonical、OpenGraph / Twitter PNG、robots、sitemap、favicon 与 404 已实现。正式域名由公开构建配置指定，Pages workflow 会自动覆盖占位 origin。

## 外部发布边界

GitHub push、仓库可见性、Pages 设置和成功部署需要单独确认。仓库提供了 Actions workflow；在 GitHub Settings → Pages 选择 GitHub Actions 后，才具备对应的发布前提。不要将预测的 Pages 地址或本地构建成功表述为已上线。

云环境安装脚本、启动说明和 GitHub API / Pages 网络域名已保存到配置草稿。草稿保存不会执行脚本、修改当前网络策略或发布环境快照；环境设置的审核、保存与发布由产品流程完成。
