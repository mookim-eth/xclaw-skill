
const http = require('https');

const API_KEY = process.env.XHUNT_API_KEY;
const BASE_URL = 'pro.cryptohunt.ai';

if (!API_KEY) {
    console.error("Error: XHUNT_API_KEY is missing.");
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
                        resolve(JSON.parse(data));
                    } catch (e) {
                        resolve(data);
                    }
                } else {
                    reject(new Error(`API Error ${res.statusCode}: ${data}`));
                }
            });
        });
        req.on('error', (e) => reject(e));
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

function slimTweets(rawData) {
    const items = Array.isArray(rawData) ? rawData : (rawData.items || []);
    return items.map(item => {
        const t = item.tweet || item;
        return {
            author: t.profile ? t.profile.name : 'Unknown',
            summary: t.ai ? t.ai.summary_cn : (t.text ? t.text.substring(0, 150) : 'No content'),
            engagement: t.statistic ? `❤️${t.statistic.likes} 🔁${t.statistic.retweet_count}` : 'N/A',
            time: t.create_time || t.created_at,
            link: t.link
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
                info: `Top hot tweets`,
                trending: slimTweets(rawData).slice(0, 20)
            }, null, 2));

        } else if (command === 'analyze') {
            const username = args[1].replace('@', '');
            let result;
            try {
                result = await requestXClaw('/tweet/kol_tweets', 'POST', { username });
                if (!result.items || result.items.length === 0) throw new Error("EMPTY");
            } catch (e) {
                result = await requestXClaw('/tweet/user_tweets', 'POST', { username });
            }
            console.log(JSON.stringify({
                info: `Analysis for @${username}`,
                tweets: slimTweets(result)
            }, null, 2));

        } else if (command === 'crawl') {
            const username = args[1].replace('@', '');
            const result = await requestXClaw('/tweet/user_tweets', 'POST', { username });
            console.log(JSON.stringify({
                info: `Real-time crawl for @${username}`,
                tweets: slimTweets(result)
            }, null, 2));

        } else if (command === 'detail') {
            const tweetId = args[1].includes('/') ? args[1].split('/').pop().split('?')[0] : args[1];
            const res = await requestXClaw('/tweet/tweet_detail', 'POST', { tweet_id: tweetId });
            console.log(JSON.stringify(res, null, 2));

        } else {
            console.log("Usage: node xclaw.js <hot|analyze|crawl|detail> <params>");
        }
    } catch (error) {
        console.error("Failed:", error.message);
        process.exit(1);
    }
}

main();
