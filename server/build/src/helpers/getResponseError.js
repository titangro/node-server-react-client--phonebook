"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseError = void 0;
exports.getResponseError = (res, error, statusCode) => {
    return res.status(statusCode).json({
        error: true,
        message: error,
    });
};
//# sourceMappingURL=getResponseError.js.map