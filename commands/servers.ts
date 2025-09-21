import { exit } from "node:process";

import {client, waitForReady} from "../lib/discord";

export const listServers = async (options: any) => {
    await waitForReady();
    const guilds = client.guilds;
    for (const [id, guild] of guilds) {
        console.log(`${guild.name} (ID: ${id}) - Members: ${guild.memberCount}`);
    }

    exit(0);
}