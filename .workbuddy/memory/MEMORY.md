# HT Portfolio 项目记忆

## 项目概述
- 个人独立站，夫妻档展示站（HT=全栈开发者 + 太太=UI设计师）
- 混搭风格，每个板块视觉独立鲜明
- 现阶段：展示和自我表达；后期：求职和接单

## 技术栈决策
- 前端：Next.js (App Router) + Tailwind CSS + Framer Motion + GSAP ScrollTrigger
- 后端：Spring Boot（轻量，前端出身，Java薄弱）
- 数据库：MySQL（阿里云 RDS），本地开发用本地 MySQL
- 部署：前端 Vercel / 后端阿里云 ECS
- 代码规范：遵循阿里标准规范
- AI：Dify API 对接
- 前后端分离架构
- 多语言：中/英文切换
- 主题：Dark/Light 模式切换（CSS Variables + context）

## 板块设计
- 首页：终端加载 + 电影感叙事（暗→亮过渡），参考 Lusion.co
- Dev Zone：暗色仪表盘（B端项目/小程序作品集），参考 GitHub
- Design Zone：PPT 展示（封面网格 + 分类 + 在线翻阅），参考 Pitch.com
- AI Lab：Dify 聊天助手 + 学习展示（暗紫科幻风），参考 Hugging Face
- Growth Log：卡片网格 + 多种跳转方式（就地展开/内部SSG页面/外链），参考 Readwise Reader

## 色板
- 首页：暗→亮过渡
- Dev Zone：深蓝/深灰暗色
- Design Zone：白/浅灰亮色
- AI Lab：深紫/深蓝 + 荧光色
- Growth Log：米白/奶油色暖色调

## 开发流程约定
- 每次开发前先确认设计方案和文档
- 确认视觉 UI 图之后再开发
- 设计文档存放在 plan/ 目录

## 站名
**HT Lab** — 专业、简洁、探索感

## 日期
- 2026-03-27：完成整体设计方案 brainstorming，输出 plan/2026-03-27-portfolio-design.md
- 2026-03-27：制作五个可交互 HTML 原型（ui/prototype/）
- 2026-03-27：搭建 Next.js 前端项目 workspace/ht-lab-front（构建通过，开发服务器运行正常）
  - 目录结构：workspace/ht-lab-front, workspace/ht-lab-back
  - 技术细节：Next.js 15.5 + TypeScript + Tailwind v4 + Framer Motion + GSAP + next-intl
  - 首页已实现：终端启动动画 + Hero（GSAP 视差） + 板块导航卡片（ScrollTrigger） + 语言切换 + 主题切换
  - 路由：/[locale] 前缀，middleware 自动重定向
