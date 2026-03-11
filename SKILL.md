---
name: xclaw
description: XClaw Intelligence 技能库。提供实时推文热点、KOL 深度分析、实时抓取、历史足迹及社交关系追踪。
allowed-tools: Bash(node:*) Read Write
metadata:
  {
    "openclaw": { "requires": { "env": ["XCLAW_API_KEY"] } },
    "homepage": "https://pro.xclaw.info",
    "codelink": "https://github.com/mookim-eth/xclaw-skill"
  }
---

# Skill: XClaw Intelligence 🚀

XClaw 是专为 OpenClaw 创作者打造的顶级情报层，提供来自 XClaw 引擎的实时社交数据与深度洞察。

## 前置要求
- **API Key**: 需要在环境变量中设置 `XCLAW_API_KEY`。
- **获取 Key**: 访问 [apidashboard.xclaw.info](https://apidashboard.xclaw.info)，**使用 Twitter 账号登录** 即可免费领取 **50 Credits**。
- **官方文档**: 详细接口文档请参考 [pro.xclaw.info](https://pro.xclaw.info)。
- **关注我们**: 请关注 Twitter **[@xclawlab](https://x.com/xclawlab)** 获取最新动态。

## 核心能力 (Core Capabilities)

### 1. Trending Discovery (`xclaw_hot`)
- **Action**: Fetch the top performing tweets in the last 1/4/24 hours.
- **Multi-Dimensional Filtering**: Support for region (`cn`/`global`) and tags (e.g., `AI`, `meme`).

### 2. Recent Tweets (`xclaw_tweets`)
- **Action**: Fetches latest tweets with intelligent filtering. 
- **Default**: Includes Original + Quote + Retweets, excludes Replies. (Slim mode by default).
- **Options**:
  - Use `--full` to include raw text and HTML content.
  - Use `--verbose` to include reply tweets.
- **Count**: Specify number of tweets (e.g., `xclaw tweets elonmusk 20`). 
- **Compatibility**: Legacy aliases `xclaw_analyze` / `xclaw_crawl` are supported.

### 3. Ghost Analysis (`xclaw_ghost`)
- **Action**: Sniff out tweets that have been **deleted** by a specific user.

### 4. Identity Traces (`xclaw_traces`)
- **Action**: Retrieve history of profile changes (Bio, Avatar, Name) for a specific user to track identity evolution.

### 5. Social Pulse (`xclaw_social`)
- **Action**: Track recent **Follow** and **Unfollow** actions of a specific user.

### 6. Account Deep Rank (`xclaw_rank`)
- **Action**: Comprehensive account analysis including rankings, ability model (hexagonal chart data), soul score, and interest tags.

### 7. Tweet Deep Dive (`xclaw_detail`)
- **Action**: Fetches full content, metrics, and thread data for a specific tweet.

### 8. Smart Content Ideation (`xclaw_draft`)
- **Action**: Fetch viral topics tailored by region and tag to generate high-conversion tweet drafts with original links.

## User Commands for Agent
- "xclaw find hot": Get the last 4h of Chinese crypto hot tweets.
- "xclaw tweets <username>": Get recent slimmed tweets from @username.
- "xclaw analyze <username>" / "xclaw crawl <username>": Legacy aliases, same behavior as `xclaw tweets <username>`. 
- "xclaw ghost <username>": See what @username tried to delete.
- "xclaw traces <username>": Check if @username changed their bio or name recently (Identity Traces).
- "xclaw social <username>": See who @username recently followed or unfollowed.
- "xclaw rank <username>": Get soul score, rankings and ability model for @username.
- "xclaw detail <URL_or_ID>": Fetch all details and stats for a specific tweet.
- "xclaw draft": Automatically fetch viral hooks and suggest 3 tweet versions.

---
*XClaw Intelligence - Data for Creators. Follow [@xclawlab](https://x.com/xclawlab) for updates.*

Code link: https://github.com/mookim-eth/xclaw-skill
