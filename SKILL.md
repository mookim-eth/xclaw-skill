---
name: xclaw
description: XClaw Intelligence Skill. Provides real-time trending tweets, KOL deep analysis, live user crawling, and deleted tweet sniffing.
allowed-tools: Bash(node:*) Read Write
metadata:
  {
    "openclaw": { "requires": { "env": ["CRYPTOHUNT_API_KEY"] } },
    "homepage": "https://pro.cryptohunt.ai"
  }
---

# Skill: XClaw Intelligence 🚀

XClaw is the premier intelligence layer for OpenClaw creators, providing real-time social data and insights from the CryptoHunt engine.

## Prerequisites
- **API Key Required**: Set `CRYPTOHUNT_API_KEY` in your environment.
- **Get your Key**: Purchase or register for an API key at [apidashboard.cryptohunt.ai](https://apidashboard.cryptohunt.ai).
- **Official API Docs**: Detailed endpoint documentation can be found at [pro.cryptohunt.ai](https://pro.cryptohunt.ai).

## Core Capabilities

### 1. Trending Discovery (`xclaw_hot`)
- **Action**: Fetch the top performing tweets in the last 1/4/24 hours.
- **Multi-Dimensional Filtering**: Support for region (`cn`/`global`) and tags (e.g., `AI`, `meme`, `ethereum`).

### 2. KOL Insight & Mirroring (`xclaw_analyze`)
- **Action**: Fetches tweets from the internal KOL database with a **real-time crawl** fallback for new users.

### 3. Ghost Analysis (`xclaw_ghost`)
- **Action**: Sniff out tweets that have been **deleted** by a specific user.
- **Logic**: Use this to find retracted statements, hidden Alpha, or "oops" moments from top KOLs.

### 4. Tweet Deep Dive (`xclaw_detail`)
- **Action**: Fetches full content, metrics (likes, bookmarks, views), and thread data for a specific tweet URL or ID.

### 5. Smart Content Ideation (`xclaw_draft`)
- **Action**: Fetch viral topics tailored by region and tag to generate high-conversion tweet drafts with original links.

## User Commands for Agent
- "xclaw find hot": Get the last 24h of Chinese crypto hot tweets.
- "xclaw analyze <username>": Deep dive into a specific person's recent output.
- "xclaw ghost <username>": See what @username tried to delete.
- "xclaw detail <URL_or_ID>": Fetch all details and stats for a specific tweet.
- "xclaw draft": Automatically fetch viral hooks and suggest 3 tweet versions.

---
*CryptoHunt Intelligence - Data for Creators.*
