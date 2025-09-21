import { Client } from 'discord.js';

let client: Client;

function registerClientEvents(client: Client) {
    client.on('ready', () => {
        client.user.setAFK(true);
        client.user.setPresence({
            game: {
                name: "BT Monitor",
                type: "WATCHING",
            }
        });
    });

    client.on('disconnect', () => {});
    client.on('error', (e) => {});
}

export function setupDiscord(token: string) {
    client = new Client();

    registerClientEvents(client);

    client.login(token).catch(err => {
        console.error('Failed to login:', err);
    });
}

export async function waitForReady() {
    if (!client) {
        throw new Error('Discord client is not initialized. Call setupDiscord first.');
    }

    if (client.readyAt) {
        return;
    }

    return new Promise<void>((resolve) => {
        client.once('ready', () => {
            resolve();
        });
    });
}

export async function shutdown() {
    if (client) {
        await client.destroy();
    }
}

export { client };