"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenFromHeaders = void 0;
exports.getTokenFromHeaders = (req) => {
    if (req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
};
//# sourceMappingURL=getTokenFromHeaders.js.map