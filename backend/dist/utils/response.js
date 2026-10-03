"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ok = void 0;
const ok = (res, message, data = {}, status = 200) => res.status(status).json({ success: true, message, data });
exports.ok = ok;
