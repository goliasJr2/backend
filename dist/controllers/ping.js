"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ping = void 0;
const ping = (req, res) => {
    res.json({ pog: true });
};
exports.ping = ping;
