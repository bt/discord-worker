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
exports.listServers = void 0;
const node_process_1 = require("node:process");
const discord_1 = require("../lib/discord");
const listServers = (options) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, discord_1.waitForReady)();
    const guilds = discord_1.client.guilds;
    for (const [id, guild] of guilds) {
        console.log(`${guild.name} (ID: ${id}) - Members: ${guild.memberCount}`);
    }
    (0, node_process_1.exit)(0);
});
exports.listServers = listServers;
