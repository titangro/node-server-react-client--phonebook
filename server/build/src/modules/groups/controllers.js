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
exports.deleteGroup = exports.updateGroup = exports.getGroup = exports.getGroups = exports.createGroup = void 0;
const model_1 = require("modules/groups/model");
const getResponseError_1 = require("helpers/getResponseError");
exports.createGroup = (req, res) => {
    try {
    }
    catch (error) {
        return getResponseError_1.getResponseError(res, error, 500);
    }
};
exports.getGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groups = yield model_1.GroupModel.find({});
        res.json(groups);
    }
    catch (error) {
        return getResponseError_1.getResponseError(res, error, 500);
    }
});
exports.getGroup = (req, res) => {
    try {
    }
    catch (error) {
        return getResponseError_1.getResponseError(res, error, 500);
    }
};
exports.updateGroup = (req, res) => {
    try {
    }
    catch (error) {
        return getResponseError_1.getResponseError(res, error, 500);
    }
};
exports.deleteGroup = (req, res) => {
    try {
    }
    catch (error) {
        return getResponseError_1.getResponseError(res, error, 500);
    }
};
//# sourceMappingURL=controllers.js.map