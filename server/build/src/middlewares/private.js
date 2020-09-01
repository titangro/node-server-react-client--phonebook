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
exports.privateRoute = void 0;
const getResponseError_1 = require("helpers/getResponseError");
const jwt = __importStar(require("jsonwebtoken"));
const getTokenFromHeaders_1 = require("helpers/getTokenFromHeaders");
exports.privateRoute = (req, res, next) => {
    const token = getTokenFromHeaders_1.getTokenFromHeaders(req);
    let verifyError;
    jwt.verify(token || '', process.env.SECRET_CODE || '', function (error, decoded) {
        if (error) {
            verifyError = { error, note: 'You are not authorized!' };
        }
    });
    if (verifyError) {
        return getResponseError_1.getResponseError(res, verifyError, 500);
    }
    return next();
};
//# sourceMappingURL=private.js.map