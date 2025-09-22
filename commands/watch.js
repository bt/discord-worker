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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchMessages = void 0;
const discord_1 = require("../lib/discord");
const serialiseMessage = (message) => {
    const omit = (obj, keyToRemove) => {
        const _a = obj, _b = keyToRemove, _ = _a[_b], rest = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
        return rest;
    };
    let embeds = [];
    if (message.embeds) {
        embeds = message.embeds.map(embed => {
            var _a;
            const cleaned = omit(omit(omit(embed, 'client'), 'message'), 'author');
            if (cleaned.fields) {
                cleaned.fields = (_a = cleaned.fields) === null || _a === void 0 ? void 0 : _a.map((field) => omit(field, 'embed'));
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
    };
};
const handleMessage = (message, webhooks) => __awaiter(void 0, void 0, void 0, function* () {
    const serialized = serialiseMessage(message);
    for (const webhookUrl of webhooks) {
        try {
            const response = yield fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(serialized),
            });
            if (!response.ok) {
                console.error(`Failed to send message to webhook ${webhookUrl}: ${response.statusText}`);
            }
            else {
                console.log(`Successfully sent message ID ${message.id} to webhook ${webhookUrl}`);
            }
        }
        catch (error) {
            console.error(`Error sending message to webhook ${webhookUrl}: ${error.message}`);
        }
    }
});
const watchMessages = (watchlist, webhooks) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, discord_1.waitForReady)();
    for (const item of watchlist) {
        discord_1.client.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (((_a = message.guild) === null || _a === void 0 ? void 0 : _a.id) === item.server_id && message.channel.id === item.channel_id) {
                console.log(`[!] Sending message ID ${message.id} from channel ID ${item.channel_id} in server ID ${item.server_id} to webhooks.`);
                yield handleMessage(message, webhooks);
            }
        }));
        console.log(`Watching channel ID ${item.channel_id} in server ID ${item.server_id}`);
    }
});
exports.watchMessages = watchMessages;
