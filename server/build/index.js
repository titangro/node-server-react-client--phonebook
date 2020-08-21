"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("./config");
const modules_1 = require("./modules");
const app = express_1.default();
dotenv_1.default.config();
const DB_CONN = process.env.DB_CONN || '';
const PORT = +(process.env.PORT || 3015);
const HOST = process.env.HOST || '';
mongoose_1.default.connect(DB_CONN, config_1.config.db.options).then(() => {
    console.log('MONGO IS CONNECTED');
});
// Middlewares
// TODO: realise initMiddleware
app.use(express_1.default.json());
// app.use(express.urlencoded());
// Modules
modules_1.initializeModules(app, '/api');
app.listen(PORT, HOST, () => {
    console.log(PORT);
});
