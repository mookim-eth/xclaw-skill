
const http = require('https');

const API_KEY = process.env.CRYPTOHUNT_API_KEY;
const BASE_URL = 'pro.cryptohunt.ai';

if (!API_KEY) {
    console.error("Error: CRYPTOHUNT_API_KEY environment variable is missing.");
    process.exit(1);
}

function requestXClaw(path, method, body) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: BASE_URL,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY
            }
        };
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        const parsed = JSON.parse(data);
                        // If API returns a standard error object
                        if (parsed && parsed.status === false) {
                            reject(new Error(parsed.msg || parsed.errMsg || "API Error"));
                        } else {
                            resolve(parsed);
                        }
                    } catch (e) {
                        resolve(data);
                    }
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${data}`));
                }
            });
        });
        req.on('error', (e) => reject(e));
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

function slimTweets(rawData, limit = 15) {
    if (!rawData) return [];
    // Handle both array response and { tweets: [] } response
    const items = Array.isArray(rawData) ? rawData : (rawData.tweets || rawData.items || []);
    return items.slice(0, limit).map(item => {
        const t = item.tweet || item;
        const info = item.info || t.info || {};
        return {
            rank: item.rank || 'N/A',
            author: t.profile ? t.profile.name : (t.username || 'KOL'),
            summary: t.ai ? t.ai.summary_cn : (info.html ? info.html.replace(/<[^>]*>?/gm, '').substring(0, 150) : (t.text ? t.text.substring(0, 150) : 'No content')),
            engagement: t.statistic ? `❤️${t.statistic.likes} 🔁${t.statistic.retweet_count}` : 'N/A',
            time: t.create_time || t.created_at,
            link: t.link || `https://x.com/i/status/${t.id}`
        };
    });
}

async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    try {
        if (command === 'hot') {
            const hours = parseInt(args[1]) || 24;
            const group = args[2] || 'cn';
            const tag = args[3] || null;
            const payload = { hours, group };
            if (tag) payload.tag = tag;

            const rawData = await requestXClaw('/tweet/hot_tweets', 'POST', payload);
            console.log(JSON.stringify({
                info: `Top hot tweets (${hours}h, ${group}${tag ? ', ' + tag : ''})`,
                trending: slimTweets(rawData, 20)
            }, null, 2));

        } else if (command === 'analyze' || command === 'crawl') {
            const username = args[1] ? args[1].replace('@', '').trim() : null;
            if (!username) throw new Error("Username/Handle is required.");

            console.log(`[XClaw] Deep searching for: @${username}...`);
            
            let result;
            try {
                // 1. Try internal tracked KOL database first (requires handle)
                result = await requestXClaw('/tweet/kol_tweets', 'POST', { handle: username, maxResults: 20 });
                if (!Array.isArray(result) || result.length === 0) throw new Error("NOT_IN_KOL_DB");
            } catch (e) {
                // If it's a real API error (like credit limit), rethrow it
                if (e.message.includes("credits") || e.message.includes("HTTP 401")) throw e;

                // 2. Fallback: Real-time crawl (requires user_id)
                console.log(`[XClaw] @${username} not in KOL DB. Fetching User ID...`);
                const profile = await requestXClaw('/user/profile_by_handle', 'POST', { handle: username });
                if (profile && profile.id) {
                    console.log(`[XClaw] Launching REAL-TIME CRAWL for UID: ${profile.id}...`);
                    result = await requestXClaw('/tweet/user_tweets', 'POST', { user_id: profile.id, maxResults: 20 });
                } else {
                    throw new Error(`User @${username} not found.`);
                }
            }
            
            console.log(JSON.stringify({
                info: `Intelligence for @${username}`,
                tweets: slimTweets(result, 15)
            }, null, 2));

        } else if (command === 'ghost' || command === 'deleted') {
            const handle = args[1] ? args[1].replace('@', '').trim() : null;
            if (!handle) throw new Error("Handle is required.");

            console.log(`[XClaw] Sniffing deleted tweets for: @${handle}...`);
            const result = await requestXClaw('/tweet/deleted_tweets', 'POST', { handle: handle });
            console.log(JSON.stringify({
                info: `Ghost Analysis (Deleted Tweets) for @${handle}`,
                deleted_tweets: slimTweets(result, 10)
            }, null, 2));

        } else if (command === 'detail') {
            const tweetId = args[1] ? (args[1].includes('/') ? args[1].split('/').pop().split('?')[0] : args[1]) : null;
            if (!tweetId) throw new Error("Tweet URL or ID is required.");

            const res = await requestXClaw('/tweet/tweet_detail', 'POST', { tweet_id: tweetId });
            console.log(JSON.stringify(res, null, 2));

        } else if (command === 'draft') {
            const hours = parseInt(args[1]) || 24;
            const group = args[2] || 'cn';
            const tag = args[3] || null;
            const payload = { hours, group };
            if (tag) payload.tag = tag;

            const rawData = await requestXClaw('/tweet/hot_tweets', 'POST', payload);
            const top5 = slimTweets(rawData, 5);
            console.log(JSON.stringify({
                instruction: `Based on these Top 5 viral topics, create 3 diverse tweet drafts.`,
                topics: top5
            }, null, 2));

        } else {
            console.log("Usage: node xclaw.js <hot|analyze|ghost|detail|draft> <params>");
        }
    } catch (error) {
        // Output clean error for the Agent
        console.log(JSON.stringify({ error: error.message }, null, 2));
        process.exit(0); // Exit with 0 so the Agent can read the JSON error
    }
}

main();
