import {WatchlistItem} from "../lib/common";
import {client, waitForReady} from "../lib/discord";
import {Message} from "discord.js";

const serialiseMessage = (message: Message) => {
    const omit = (obj: any, keyToRemove: string) => {
        const {[keyToRemove]: _, ...rest} = obj;
        return rest;
    }

    let embeds: any[] = [];
    if (message.embeds) {
        embeds = message.embeds.map(embed => {
            const cleaned = omit(omit(omit(embed, 'client'), 'message'), 'author');
            if (cleaned.fields) {
                cleaned.fields = cleaned.fields?.map((field: any) => omit(field, 'embed'));
            }
            if (cleaned.thumbnail) {
                cleaned.thumbnail = omit(cleaned.thumbnail, 'embed');
            }
            return cleaned;
        });
    }

    return {
        id: message.id,
        author: omit(message.author, 'client'),
        content: message.content,
        embeds,
        timestamp: message.createdTimestamp,
    }
};

const handleMessage = async (message: Message, webhooks: string[]) => {
    const serialized = serialiseMessage(message);

    for (const webhookUrl of webhooks) {
        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(serialized),
            });

            if (!response.ok) {
                console.error(`Failed to send message to webhook ${webhookUrl}: ${response.statusText}`);
            } else {
                console.log(`Successfully sent message ID ${message.id} to webhook ${webhookUrl}`);
            }
        } catch (error) {
            console.error(`Error sending message to webhook ${webhookUrl}: ${error.message}`);
        }
    }
}

export const watchMessages = async (watchlist: WatchlistItem[], webhooks: string[]) => {
    await waitForReady();

    for (const item of watchlist) {
        client.on("message", async message => {
            if (message.guild?.id === item.server_id && message.channel.id === item.channel_id) {
                console.log(`[!] Sending message ID ${message.id} from channel ID ${item.channel_id} in server ID ${item.server_id} to webhooks.`);
                await handleMessage(message, webhooks);
            }
        });

        console.log(`Watching channel ID ${item.channel_id} in server ID ${item.server_id}`);
    }
}