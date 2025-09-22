"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listChannels = void 0;
const node_process_1 = require("node:process");
const discord_1 = require("../lib/discord");
const listChannels = (serverId, options) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, discord_1.waitForReady)();
    const guild = discord_1.client.guilds.find(g => g.id === serverId);
    if (!guild) {
        console.error(`Server with ID ${serverId} not found.`);
        (0, node_process_1.exit)(1);
    }
    const channels = guild.channels;
    for (const [id, channel] of channels) {
        console.log(`${channel.name} (ID: ${id}) - Type: ${channel.type}`);
    }
    (0, node_process_1.exit)(0);
});
exports.listChannels = listChannels;
