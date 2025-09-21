import fs from 'node:fs';

export type WatchlistItem = {
    server_id: string;
    channel_id: string;
};

export type Config = {
    token: string;
    watchlist: WatchlistItem[];
    webhooks: string[];
};

// Read config from config.json
export function loadConfig(): Config {
    const rawData = fs.readFileSync('config.json', 'utf-8');
    const config = JSON.parse(rawData);
    if (!validateToken(config.token)) {
        throw new Error('Invalid token in config.json');
    }
    return config;
}

function validateToken(token: string): boolean {
    return token.length === 70;
}