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
exports.client = void 0;
exports.setupDiscord = setupDiscord;
exports.waitForReady = waitForReady;
exports.shutdown = shutdown;
const discord_js_1 = require("discord.js");
let client;
function registerClientEvents(client) {
    client.on('ready', () => {
        client.user.setAFK(true);
        client.user.setPresence({
            game: {
                name: "BT Monitor",
                type: "WATCHING",
            }
        });
    });
    client.on('disconnect', () => { });
    client.on('error', (e) => { });
}
function setupDiscord(token) {
    exports.client = client = new discord_js_1.Client();
    registerClientEvents(client);
    client.login(token).catch(err => {
        console.error('Failed to login:', err);
    });
}
function waitForReady() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!client) {
            throw new Error('Discord client is not initialized. Call setupDiscord first.');
        }
        if (client.readyAt) {
            return;
        }
        return new Promise((resolve) => {
            client.once('ready', () => {
                resolve();
            });
        });
    });
}
function shutdown() {
    return __awaiter(this, void 0, void 0, function* () {
        if (client) {
            yield client.destroy();
        }
    });
}
