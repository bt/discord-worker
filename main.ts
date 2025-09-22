import {exit} from "node:process";

import {program} from 'commander';
import {listServers} from './commands/servers';
import {listChannels} from './commands/channels';
import {watchMessages} from './commands/watch';

import {loadConfig} from './lib/common';
import {setupDiscord} from './lib/discord';

try {
    const config = loadConfig();
    setupDiscord(config.token);

    program
        .name('discord-worker')
        .description('Watch Discord channels, process the messages and then send them to a webhook.')
        .version('1.0.0');

    program.command('servers')
        .description('List all servers the bot is in.')
        .action(listServers);

    program.command('channels')
        .description('List all channels in the specified server.')
        .argument('<serverId>', 'The ID of the server.')
        .action(listChannels);

    program.command('watch')
        .description('Watch specified channels for new messages.')
        .action(() => {
            return watchMessages(config.watchlist, config.webhooks);
        });

    program.parse();
} catch (e: any) {
    console.error(`Error loading config: ${e.message}`);
    exit(1);
}
