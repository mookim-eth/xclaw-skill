---
name: xclaw
description: XClaw Intelligence Skill. Provides real-time trending tweets, KOL deep analysis, live user crawling, profile history, and social relation tracking. | XClaw Intelligence 技能库。提供实时推文热点、KOL 深度分析、实时抓取、历史足迹及社交关系追踪。
allowed-tools: Bash(node:*) Read Write
metadata:
  {
    "openclaw": { "requires": { "env": ["XCLAW_API_KEY"] } },
    "homepage": "https://pro.xclaw.info",
    "codelink": "https://github.com/mookim-eth/xclaw-skill"
  }
---

# Skill: XClaw Intelligence 🚀

XClaw is the premier intelligence layer for OpenClaw creators, providing real-time social data and insights from the XClaw engine.
XClaw 是专为 OpenClaw 创作者打造的顶级情报层，提供来自 XClaw 引擎的实时社交数据与深度洞察。

## Prerequisites | 前置要求
- **API Key Required**: Set `XCLAW_API_KEY` in your environment. | **需要 API Key**: 请在环境变量中设置 `XCLAW_API_KEY`。
- **Get your Key**: Visit [apidashboard.xclaw.info](https://apidashboard.xclaw.info) and **login with Twitter** to claim **50 free credits**. | **获取 Key**: 访问 [apidashboard.xclaw.info](https://apidashboard.xclaw.info)，**使用 Twitter 账号登录** 即可免费领取 **50 Credits**。
- **Official API Docs**: Detailed endpoint documentation can be found at [pro.xclaw.info](https://pro.xclaw.info). | **官方文档**: 详细接口文档请参考 [pro.xclaw.info](https://pro.xclaw.info)。
- **Stay Updated**: Follow our Twitter **[@xclawlab](https://x.com/xclawlab)** for the latest updates. | **关注我们**: 请关注 Twitter **[@xclawlab](https://x.com/xclawlab)** 获取最新动态。

## Core Capabilities | 核心能力

### 1. Trending Discovery | 热门趋势 (`xclaw_hot`)
- **Action**: Fetch the top performing tweets in the last 1/4/24 hours. | 获取过去 1/4/24 小时内的热门推文。
- **Filtering**: Support for region (`cn`/`global`) and tags (e.g., `AI`, `meme`). | 支持按地区和标签过滤。

### 2. Recent Tweets | 最近推文 (`xclaw_tweets`)
- **Action**: Fetches latest tweets with intelligent filtering. | 获取带有智能过滤的最新推文。 
- **Default**: Includes Original + Quote + Retweets, excludes Replies. | 默认包含原创、引用和转发，排除回复。
- **Options**:
  - Use `--full` to include raw text and HTML content. | 使用 `--full` 包含原文和 HTML 内容。
  - Use `--verbose` to include reply tweets. | 使用 `--verbose` 包含回复推文。

### 3. Ghost Analysis | 幽灵推文 (`xclaw_ghost`)
- **Action**: Sniff out tweets that have been **deleted** by a specific user. | 嗅探特定用户已删除的推文。

### 4. Identity Traces | 身份足迹 (`xclaw_traces`)
- **Action**: Retrieve history of profile changes (Bio, Avatar, Name). | 获取个人资料（简介、头像、名字）的修改历史。

### 5. Social Pulse | 社交脉搏 (`xclaw_social`)
- **Action**: Track recent **Follow** and **Unfollow** actions. | 追踪最近的关注和取关行为。

### 6. Account Deep Rank | 深度背调 (`xclaw_rank`)
- **Action**: Comprehensive analysis including soul score and ability model. | 包含灵魂指数、能力模型和排名的全面分析。

### 7. Tweet Deep Dive | 推文拆解 (`xclaw_detail`)
- **Action**: Fetches full content and metrics for a specific tweet. | 获取单条推文的详尽数据与指标。

### 8. Smart Content Ideation | 内容创作 (`xclaw_draft`)
- **Action**: Fetch viral topics to generate high-conversion tweet drafts. | 获取爆火话题并生成高转化率的推文草稿。

## User Commands | 用户指令
- `xclaw find hot`: Get 4h Chinese hot tweets. | 获取 4 小时中文热门推文。
- `xclaw tweets <username>`: Get recent slimmed tweets. | 获取脱脂后的最新推文。
- `xclaw ghost <username>`: See deleted tweets. | 查看已删除推文。
- `xclaw traces <username>`: Check profile history. | 检查个人资料修改历史。
- `xclaw social <username>`: See follows/unfollows. | 查看关注/取关动态。
- `xclaw rank <username>`: Get soul score & model. | 获取灵魂指数与能力模型。
- `xclaw detail <URL_or_ID>`: Fetch full stats. | 获取推文详细统计。
- `xclaw draft`: Suggest tweet versions. | 自动生成推文草稿建议。

---
*XClaw Intelligence - Data for Creators. Follow [@xclawlab](https://x.com/xclawlab) for updates.*
*XClaw Intelligence - 为创作者提供数据。关注 [@xclawlab](https://x.com/xclawlab) 获取最新动态。*

Code link: https://github.com/mookim-eth/xclaw-skill
