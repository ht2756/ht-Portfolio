export type Locale = "zh" | "en";

type LocalizedText = Record<Locale, string>;

export type Stat = {
  value: string;
  label: LocalizedText;
};

export type ShowcaseProject = {
  title: LocalizedText;
  description: LocalizedText;
  category: LocalizedText;
  year: string;
  accent: string;
  metrics: Stat[];
  tags: string[];
};

export type PresentationWork = {
  title: LocalizedText;
  description: LocalizedText;
  category: LocalizedText;
  pages: number;
  palette: string;
  date: string;
  pdfUrl: string;
};

export type AiCapability = {
  title: LocalizedText;
  description: LocalizedText;
  signal: string;
};

export type GrowthEntry = {
  title: LocalizedText;
  description: LocalizedText;
  date: string;
  type: LocalizedText;
  skill: string;
};

export type BabyMilestone = {
  age: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  date: LocalizedText;
  accent: string;
};

export type BabyMoment = {
  title: LocalizedText;
  description: LocalizedText;
  note: LocalizedText;
  color: string;
};

export type BabyFavorite = {
  label: LocalizedText;
  value: LocalizedText;
};

export const homeHighlights = [
  {
    value: "05",
    label: { zh: "独立展区", en: "Focused zones" },
  },
  {
    value: "28+",
    label: { zh: "作品与记录", en: "Works and logs" },
  },
  {
    value: "2",
    label: { zh: "创作身份", en: "Creative roles" },
  },
] satisfies Stat[];

export const babyStats = [
  { value: "12", label: { zh: "成长里程碑", en: "Tiny milestones" } },
  { value: "4", label: { zh: "家庭相册", en: "Memory cards" } },
  { value: "8", label: { zh: "喜欢清单", en: "Favorite notes" } },
  { value: "∞", label: { zh: "每天惊喜", en: "Daily surprises" } },
] satisfies Stat[];

export const babyMilestones: BabyMilestone[] = [
  {
    age: { zh: "第 1 月", en: "Month 1" },
    title: { zh: "第一次认真看世界", en: "First curious gaze" },
    description: {
      zh: "眼神开始追着爸爸妈妈移动，家里的每盏灯都像新的星星。",
      en: "Eyes start following mom and dad, and every light at home feels like a new star.",
    },
    date: { zh: "2026.01", en: "2026.01" },
    accent: "#f9738a",
  },
  {
    age: { zh: "第 3 月", en: "Month 3" },
    title: { zh: "会笑出声音", en: "Laughing out loud" },
    description: {
      zh: "被逗笑时会把小手举起来，整个房间都会变得很亮。",
      en: "A tiny laugh, little hands in the air, and the whole room gets brighter.",
    },
    date: { zh: "2026.03", en: "2026.03" },
    accent: "#f59e0b",
  },
  {
    age: { zh: "第 6 月", en: "Month 6" },
    title: { zh: "翻身和探索", en: "Rolling into discovery" },
    description: {
      zh: "从小毯子的一角滚到另一角，正式开启自己的探索地图。",
      en: "Rolling from one corner of the mat to the other, opening a tiny map of discovery.",
    },
    date: { zh: "2026.06", en: "2026.06" },
    accent: "#10b981",
  },
  {
    age: { zh: "未来", en: "Next" },
    title: { zh: "第一句小小的话", en: "First tiny words" },
    description: {
      zh: "留给未来的空白格，等某一天被一句奶声奶气的话填满。",
      en: "A blank space for the future, waiting to be filled by the first soft little word.",
    },
    date: { zh: "待更新", en: "soon" },
    accent: "#38bdf8",
  },
];

export const babyMoments: BabyMoment[] = [
  {
    title: { zh: "晨光小床", en: "Morning crib light" },
    description: {
      zh: "醒来以后先观察窗帘，再慢慢把笑容递给这个家。",
      en: "Wakes up by studying the curtains first, then slowly gives the room a smile.",
    },
    note: { zh: "适合放宝宝晨起照片", en: "Place a morning photo here" },
    color: "from-rose-200 via-orange-100 to-amber-100",
  },
  {
    title: { zh: "小脚印档案", en: "Little footprint file" },
    description: {
      zh: "把身高、体重、脚印和每一次新技能都收进柔软的成长抽屉。",
      en: "Keeps height, weight, footprints, and every new skill in one soft growth drawer.",
    },
    note: { zh: "记录成长数据", en: "Growth data slot" },
    color: "from-emerald-100 via-teal-100 to-sky-100",
  },
  {
    title: { zh: "睡前宇宙", en: "Bedtime universe" },
    description: {
      zh: "小夜灯、故事声和慢慢安静下来的呼吸，组成每天最温柔的结尾。",
      en: "Night light, story voices, and softer breathing make the gentlest end to each day.",
    },
    note: { zh: "晚安故事角", en: "Bedtime story corner" },
    color: "from-indigo-100 via-violet-100 to-rose-100",
  },
  {
    title: { zh: "一家三口", en: "Family frame" },
    description: {
      zh: "HT Lab 不只记录作品，也记录让作品有意义的生活本身。",
      en: "HT Lab records not only the work, but the life that makes the work meaningful.",
    },
    note: { zh: "家庭合照占位", en: "Family portrait slot" },
    color: "from-yellow-100 via-lime-100 to-green-100",
  },
];

export const babyFavorites: BabyFavorite[] = [
  { label: { zh: "最爱声音", en: "Favorite sound" }, value: { zh: "妈妈的哼唱", en: "Mom humming" } },
  { label: { zh: "最爱颜色", en: "Favorite color" }, value: { zh: "奶油黄", en: "Butter yellow" } },
  { label: { zh: "最爱游戏", en: "Favorite game" }, value: { zh: "躲猫猫", en: "Peekaboo" } },
  { label: { zh: "最爱时间", en: "Favorite time" }, value: { zh: "睡前抱抱", en: "Bedtime hug" } },
];

export const devProjects: ShowcaseProject[] = [
  {
    title: { zh: "AstraOps 企业运营中台", en: "AstraOps Operations Hub" },
    description: {
      zh: "面向多门店业务的运营中台，覆盖权限、审批、数据看板、移动端巡检和低代码表单。",
      en: "An enterprise operations hub for multi-branch teams with permissions, approvals, dashboards, inspections, and low-code forms.",
    },
    category: { zh: "B 端系统", en: "B2B System" },
    year: "2026",
    accent: "#58a6ff",
    metrics: [
      { value: "42", label: { zh: "业务模块", en: "Modules" } },
      { value: "11", label: { zh: "角色权限", en: "Roles" } },
    ],
    tags: ["Next.js", "Spring Boot", "MySQL", "RBAC"],
  },
  {
    title: { zh: "Mica 小程序增长套件", en: "Mica Mini Program Suite" },
    description: {
      zh: "为本地生活业务设计的微信小程序套件，包含会员、活动、核销、订单和素材投放。",
      en: "A WeChat mini program suite for local commerce covering members, campaigns, redemption, orders, and content distribution.",
    },
    category: { zh: "小程序套件", en: "Mini Program" },
    year: "2025",
    accent: "#3fb950",
    metrics: [
      { value: "6", label: { zh: "核心流程", en: "Flows" } },
      { value: "18K", label: { zh: "模拟用户", en: "Mock users" } },
    ],
    tags: ["Vue", "UniApp", "WeChat", "API"],
  },
  {
    title: { zh: "PulseAI 内部效率助手", en: "PulseAI Workflow Assistant" },
    description: {
      zh: "基于 Dify 工作流的内部助手，串联知识库、日报摘要、需求拆分和客服问答。",
      en: "A Dify-based internal assistant connecting knowledge retrieval, daily summaries, requirement breakdowns, and support Q&A.",
    },
    category: { zh: "AI 工具", en: "AI Tool" },
    year: "2026",
    accent: "#bc8cff",
    metrics: [
      { value: "8", label: { zh: "工作流", en: "Workflows" } },
      { value: "3.2s", label: { zh: "响应模拟", en: "Mock latency" } },
    ],
    tags: ["Dify", "RAG", "Prompt", "Node.js"],
  },
];

export const designWorks: PresentationWork[] = [
  {
    title: { zh: "星云科技品牌视觉提案", en: "Nebula Tech Brand Proposal" },
    description: {
      zh: "从品牌定位、视觉符号、色彩系统到应用场景的一整套科技品牌提案。",
      en: "A full technology brand proposal from positioning and visual symbols to color systems and applications.",
    },
    category: { zh: "品牌设计", en: "Brand Design" },
    pages: 24,
    palette: "from-indigo-500 via-violet-500 to-fuchsia-400",
    date: "2026.03",
    pdfUrl: "/design-pdfs/nebula-tech-brand-proposal.pdf",
  },
  {
    title: { zh: "年度营销复盘报告", en: "Annual Marketing Review" },
    description: {
      zh: "用清晰信息层级和数据视觉化，帮助客户讲清年度增长、渠道和下一步策略。",
      en: "A data-led annual review that clarifies growth, channels, market signals, and next-step strategy.",
    },
    category: { zh: "商业提案", en: "Business Pitch" },
    pages: 18,
    palette: "from-rose-500 via-orange-400 to-amber-300",
    date: "2026.01",
    pdfUrl: "/design-pdfs/annual-marketing-review.pdf",
  },
  {
    title: { zh: "春日快闪活动策划", en: "Spring Pop-up Campaign" },
    description: {
      zh: "面向年轻用户的活动策划案，包含视觉概念、动线、社媒扩散和预算结构。",
      en: "A youth-focused campaign deck covering visual concepts, flow, social amplification, and budget structure.",
    },
    category: { zh: "活动策划", en: "Campaign" },
    pages: 32,
    palette: "from-cyan-500 via-sky-400 to-emerald-300",
    date: "2025.12",
    pdfUrl: "/design-pdfs/spring-pop-up-campaign.pdf",
  },
  {
    title: { zh: "教育产品发布课件", en: "Learning Product Launch Deck" },
    description: {
      zh: "为在线教育产品设计的发布课件，突出课程体系、用户路径和增长模型。",
      en: "A launch deck for an education product, focused on curriculum systems, user paths, and growth loops.",
    },
    category: { zh: "教育培训", en: "Education" },
    pages: 26,
    palette: "from-emerald-500 via-teal-400 to-lime-300",
    date: "2025.11",
    pdfUrl: "/design-pdfs/learning-product-launch-deck.pdf",
  },
  {
    title: { zh: "城市咖啡品牌招商书", en: "Urban Coffee Franchise Pitch" },
    description: {
      zh: "兼顾商业测算和品牌气质的招商型 PPT，用于线下门店扩张沟通。",
      en: "A franchise pitch that balances business projections with brand atmosphere for retail expansion.",
    },
    category: { zh: "商业提案", en: "Business Pitch" },
    pages: 20,
    palette: "from-stone-700 via-amber-700 to-orange-400",
    date: "2025.10",
    pdfUrl: "/design-pdfs/urban-coffee-franchise-pitch.pdf",
  },
  {
    title: { zh: "新品发布视觉故事线", en: "Product Launch Storyline" },
    description: {
      zh: "以电影分镜方式组织新品发布内容，让卖点、场景和传播节奏更清晰。",
      en: "A cinematic product-launch storyline that clarifies value points, scenarios, and campaign rhythm.",
    },
    category: { zh: "创意方案", en: "Creative" },
    pages: 30,
    palette: "from-slate-900 via-blue-600 to-cyan-300",
    date: "2025.09",
    pdfUrl: "/design-pdfs/product-launch-storyline.pdf",
  },
];

export const aiCapabilities: AiCapability[] = [
  {
    title: { zh: "知识库问答", en: "Knowledge Q&A" },
    description: {
      zh: "把项目资料、技术笔记和服务说明整理成可检索知识库。",
      en: "Turns project notes, technical docs, and service material into a searchable knowledge base.",
    },
    signal: "RAG",
  },
  {
    title: { zh: "工作流编排", en: "Workflow Orchestration" },
    description: {
      zh: "用 Dify 串联分类、检索、生成、审核等节点，适合重复性业务流程。",
      en: "Composes classification, retrieval, generation, and review nodes for repeatable workflows.",
    },
    signal: "Dify",
  },
  {
    title: { zh: "Prompt 设计", en: "Prompt Design" },
    description: {
      zh: "沉淀角色、约束、输出格式和示例，让 AI 输出更稳定。",
      en: "Defines roles, constraints, output formats, and examples for more stable AI outputs.",
    },
    signal: "Prompt",
  },
  {
    title: { zh: "API 接入", en: "API Integration" },
    description: {
      zh: "预留后端代理和鉴权路径，后续可接真实 Dify 应用。",
      en: "Prepares the proxy and auth path for future production Dify app integration.",
    },
    signal: "API",
  },
];

export const growthEntries: GrowthEntry[] = [
  {
    title: { zh: "Next.js App Router 深入理解", en: "Understanding Next.js App Router" },
    description: {
      zh: "梳理 Server Components、路由布局、loading/error 边界和 next-intl 接入方式。",
      en: "Notes on Server Components, route layouts, loading/error boundaries, and next-intl integration.",
    },
    date: "2026.03.27",
    type: { zh: "笔记", en: "Note" },
    skill: "React",
  },
  {
    title: { zh: "Dify 从知识库到工作流", en: "Dify from Knowledge Base to Workflow" },
    description: {
      zh: "记录从知识库配置、提示词调试到工作流节点拆分的完整实验路径。",
      en: "Tracks experiments from knowledge setup and prompt tuning to workflow node design.",
    },
    date: "2026.03.18",
    type: { zh: "详细", en: "Deep Dive" },
    skill: "AI",
  },
  {
    title: { zh: "B 端权限模型复盘", en: "B2B Permission Model Review" },
    description: {
      zh: "复盘菜单、按钮、数据范围、组织架构和审计日志之间的边界。",
      en: "Reviews boundaries between menus, actions, data scopes, organizations, and audit logs.",
    },
    date: "2026.02.21",
    type: { zh: "笔记", en: "Note" },
    skill: "Backend",
  },
  {
    title: { zh: "PPT 作品陈列灵感库", en: "Presentation Gallery Inspiration" },
    description: {
      zh: "收藏画廊、封面网格、在线翻页和作品详情页的信息架构灵感。",
      en: "A collection of gallery, cover grid, page viewer, and work detail layout references.",
    },
    date: "2026.01.30",
    type: { zh: "外链", en: "Link" },
    skill: "Design",
  },
  {
    title: { zh: "Tailwind v4 主题变量实践", en: "Tailwind v4 Theme Token Practice" },
    description: {
      zh: "整理 CSS variables、组件级样式和页面局部主题之间的边界。",
      en: "Organizes boundaries between CSS variables, component utilities, and page-level themes.",
    },
    date: "2026.02.08",
    type: { zh: "详细", en: "Deep Dive" },
    skill: "CSS",
  },
  {
    title: { zh: "设计作品集信息架构", en: "Portfolio Information Architecture" },
    description: {
      zh: "比较 Behance、Pitch 和独立站作品页，拆解封面、分类、详情和联系入口。",
      en: "Compares Behance, Pitch, and independent portfolio pages across covers, categories, details, and contact paths.",
    },
    date: "2026.01.16",
    type: { zh: "外链", en: "Link" },
    skill: "Design",
  },
];

export const devStats = [
  { value: "3", label: { zh: "精选项目", en: "Featured projects" } },
  { value: "4", label: { zh: "技术方向", en: "Tech tracks" } },
  { value: "68", label: { zh: "活动节点", en: "Activity nodes" } },
  { value: "12", label: { zh: "复用模块", en: "Reusable modules" } },
] satisfies Stat[];

export const designStats = [
  { value: "6", label: { zh: "精选作品", en: "Selected works" } },
  { value: "4", label: { zh: "作品分类", en: "Categories" } },
  { value: "150+", label: { zh: "页面设计", en: "Slides designed" } },
  { value: "2.4K", label: { zh: "模拟浏览", en: "Mock views" } },
] satisfies Stat[];

export const aiStats = [
  { value: "4", label: { zh: "AI 能力", en: "Capabilities" } },
  { value: "7", label: { zh: "实验节点", en: "Experiment nodes" } },
  { value: "3.2s", label: { zh: "模拟响应", en: "Mock response" } },
  { value: "Dify", label: { zh: "工作流平台", en: "Workflow base" } },
] satisfies Stat[];

export const growthStats = [
  { value: "6", label: { zh: "成长记录", en: "Growth records" } },
  { value: "2", label: { zh: "月份分组", en: "Month groups" } },
  { value: "3", label: { zh: "卡片类型", en: "Card types" } },
  { value: "12", label: { zh: "技能标签", en: "Skill tags" } },
] satisfies Stat[];

export const techTracks = [
  {
    title: { zh: "前端系统", en: "Frontend Systems" },
    items: ["Next.js", "React", "Vue", "TypeScript", "Tailwind"],
  },
  {
    title: { zh: "后端与数据", en: "Backend & Data" },
    items: ["Spring Boot", "MySQL", "REST API", "RBAC", "Audit"],
  },
  {
    title: { zh: "AI 工作流", en: "AI Workflow" },
    items: ["Dify", "RAG", "Prompt", "Agent", "Knowledge Base"],
  },
  {
    title: { zh: "交付运维", en: "Delivery" },
    items: ["Vercel", "Aliyun", "Docker", "CI", "Monitoring"],
  },
];

export const localized = (value: LocalizedText, locale: Locale) => value[locale] ?? value.zh;
