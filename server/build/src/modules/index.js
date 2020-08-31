"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeModules = void 0;
const contacts_1 = __importDefault(require("./contacts"));
const auth_1 = __importDefault(require("./auth"));
exports.initializeModules = (app, urlPrefix) => {
    app.use(`${urlPrefix}/contacts`, contacts_1.default);
    app.use(`${urlPrefix}/auth`, auth_1.default);
    // TODO: realize other module imports
};
// TODO: add genarations
// 1 itterate in modules
// 2 require each module by folder name
// 3 logger modules required
//# sourceMappingURL=index.js.map