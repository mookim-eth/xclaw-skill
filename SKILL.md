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
- **Logic**: Use it to suggest content ideas based on real engagement data.

### 2. KOL Insight & Mirroring (`xclaw_analyze`)
- **Action**: Fetches tweets from the internal KOL database. 
- **Smart Fallback**: If the user is not found in the tracked list, it automatically triggers a **real-time crawl** of the user's latest profile.

### 3. Tweet Deep Dive (`xclaw_detail`)
- **Action**: Fetches full content, metrics (likes, retweets), and thread data for a specific tweet.
- **Usage**: When a specific URL or Tweet ID is provided for analysis.

## User Commands for Agent
- "xclaw find hot": Get the last 4h of Chinese crypto hot tweets.
- "xclaw analyze <username>": Deep dive into a specific person's recent output.
- "xclaw detail <URL_or_ID>": Fetch all details and stats for a specific tweet.
- "xclaw draft": Create a viral tweet draft based on the latest XClaw trending data.

---
*CryptoHunt Intelligence - Data for Creators.*
