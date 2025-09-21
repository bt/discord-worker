import { exit } from "node:process";

import {client, waitForReady} from "../lib/discord";

export const listChannels = async (serverId: string, options: any) => {
    await waitForReady();
    const guild = client.guilds.find(g => g.id === serverId);
    if (!guild) {
        console.error(`Server with ID ${serverId} not found.`);
        exit(1);
    }

    const channels = guild.channels;
    for (const [id, channel] of channels) {
        console.log(`${channel.name} (ID: ${id}) - Type: ${channel.type}`);
    }

    exit(0);
}