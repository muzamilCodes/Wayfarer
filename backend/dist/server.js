"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_1 = require("./config/db");
const env_1 = require("./config/env");
const start = async () => {
    try {
        await (0, db_1.connectDB)();
    }
    catch (e) {
        console.warn('MongoDB connection pending or failed. Retrying in background:', e.message);
    }
    app_1.app.listen(env_1.env.PORT, () => {
        console.log(`API on :${env_1.env.PORT}`);
    });
};
start();
