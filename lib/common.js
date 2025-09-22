"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = loadConfig;
const node_fs_1 = __importDefault(require("node:fs"));
// Read config from config.json
function loadConfig() {
    const rawData = node_fs_1.default.readFileSync('config.json', 'utf-8');
    const config = JSON.parse(rawData);
    if (!validateToken(config.token)) {
        throw new Error('Invalid token in config.json');
    }
    return config;
}
function validateToken(token) {
    return token.length === 70;
}
