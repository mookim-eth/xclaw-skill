---
name: xclaw
description: XClaw Intelligence Skill. Provides real-time trending tweets, KOL deep analysis, and live user crawling.
allowed-tools: Bash(node:*) Read Write
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
- **Multi-Dimensional Filtering**: Support for region (`cn`/`global`) and tags (e.g., `AI`, `meme`).

### 2. KOL Insight & Mirroring (`xclaw_analyze`)
- **Action**: Fetches tweets from the internal KOL database with a **real-time crawl** fallback for new users.

### 3. Tweet Deep Dive (`xclaw_detail`)
- **Action**: Fetches full content, metrics, and thread data for a specific tweet.

### 4. Smart Drafting (`xclaw_draft`)
- **Action**: Specifically prepares the Top 5 viral topics for the Agent to generate high-conversion tweet drafts.
- **Usage**: When the user wants to "create content", "get some ideas", or "write a draft".

## User Commands for Agent
- "xclaw find hot": Get the last 4h of Chinese crypto hot tweets.
- "xclaw analyze <username>": Deep dive into a specific person's recent output.
- "xclaw detail <URL_or_ID>": Fetch all details and stats for a specific tweet.
- "xclaw draft": Automatically fetch the best viral hooks and suggest 3 tweet versions.

---
*CryptoHunt Intelligence - Data for Creators.*
