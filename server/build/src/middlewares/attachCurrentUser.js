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
Object.defineProperty(exports, "__esModule", { value: true });
const getResponseError_1 = require("helpers/getResponseError");
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const decodedUser = req.token.data;
        // const user = await UserModel.findOne({ _id: decodedUser._id });
        // if (!user) {
        //   return getResponseError(res, 'User not found', 401);
        // }
        // req.body = user;
        return next();
    }
    catch (error) {
        return getResponseError_1.getResponseError(res, error, 500);
    }
});
//# sourceMappingURL=attachCurrentUser.js.map