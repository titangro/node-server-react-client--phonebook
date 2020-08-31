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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../config");
const modules_1 = require("./modules");
path_1.default.resolve(__filename);
const app = express_1.default();
dotenv_1.default.config();
const DB_CONN = process.env.DB_CONN || '';
const PORT = +(process.env.PORT || 3015);
const HOST = process.env.HOST || '';
const handleError = (error) => console.log(error);
// Middlewares
// TODO: realise initMiddleware
app.use(express_1.default.json());
// app.use(express.urlencoded());
// Modules
modules_1.initializeModules(app, '/api');
app.listen(PORT, HOST, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Server ready!');
    yield mongoose_1.default
        .connect(DB_CONN, config_1.config.db.options)
        .then(() => {
        console.log('MONGO IS CONNECTED');
    })
        .catch((error) => handleError(error));
    console.log('Listening on port ', PORT);
}));
//# sourceMappingURL=index.js.map