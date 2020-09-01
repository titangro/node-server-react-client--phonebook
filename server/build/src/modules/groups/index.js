"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers = __importStar(require("./controllers"));
const private_1 = require("middlewares/private");
const attachCurrentUser_1 = require("middlewares/attachCurrentUser");
const router = express_1.Router();
router.post('/', [private_1.privateRoute, attachCurrentUser_1.attachCurrentUser], controllers.createGroup);
router.get('/', [private_1.privateRoute, attachCurrentUser_1.attachCurrentUser], controllers.getGroups);
router.get('/:id', [private_1.privateRoute, attachCurrentUser_1.attachCurrentUser], controllers.getGroup);
router.put('/:id', [private_1.privateRoute, attachCurrentUser_1.attachCurrentUser], controllers.updateGroup);
router.delete('/:id', [private_1.privateRoute, attachCurrentUser_1.attachCurrentUser], controllers.deleteGroup);
exports.default = router;
//# sourceMappingURL=index.js.map