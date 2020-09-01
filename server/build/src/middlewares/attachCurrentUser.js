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
exports.attachCurrentUser = void 0;
const model_1 = require("modules/auth/model");
const getResponseError_1 = require("helpers/getResponseError");
const getTokenFromHeaders_1 = require("helpers/getTokenFromHeaders");
const jwt = __importStar(require("jsonwebtoken"));
exports.attachCurrentUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = getTokenFromHeaders_1.getTokenFromHeaders(req);
        const decodedUser = jwt.verify(token || '', process.env.SECRET_CODE || '');
        const { id: userId } = decodedUser;
        const user = yield model_1.UserModel.findOne({ id: userId });
        if (!user) {
            return getResponseError_1.getResponseError(res, 'User not found', 401);
        }
        req.body.user = user;
        return next();
    }
    catch (error) {
        return getResponseError_1.getResponseError(res, error, 500);
    }
});
//# sourceMappingURL=attachCurrentUser.js.map