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
exports.signUp = exports.login = void 0;
const model_1 = require("../../modules/contacts/model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const model_2 = require("./model");
const helpers_1 = require("./helpers");
const getResponseError_1 = require("helpers/getResponseError");
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // получаем данные Post запроса
        const { email, password } = req.body;
        // исключение при отсутсвии email
        if (!email) {
            return getResponseError_1.getResponseError(res, 'User email is wrong', 500);
        }
        // поиск существующего пользователя по email
        const userRecord = yield model_2.UserModel.findOne({
            email,
        });
        if (!userRecord) {
            // исключение если пользователь не найден
            return getResponseError_1.getResponseError(res, 'User not found', 404);
        }
        else {
            // сравнение хешей паролей
            const correctPassword = yield bcrypt_1.default.compare(password, userRecord.password);
            if (!correctPassword) {
                // исключение если пароли разные
                return getResponseError_1.getResponseError(res, 'Incorrect password', 500);
            }
        }
        return res.json(`Bearer ${helpers_1.generateJWT(userRecord)}`);
    }
    catch (error) {
        return getResponseError_1.getResponseError(res, error, 500);
    }
});
exports.signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // получаем данные Post запроса из body, хешируем пароль
        const { password, name, email, number } = req.body;
        const passwordHashed = yield bcrypt_1.default.hash(password, 10);
        // поиск уже зарегистрированного пользователя
        const createdUser = yield model_2.UserModel.findOne({
            email,
        });
        // если пользователь уже существует к идаем исключение
        if (createdUser) {
            return getResponseError_1.getResponseError(res, 'Such user already exists', 401);
        }
        // создаем пользователя
        const userRecord = yield model_2.UserModel.create({
            password: passwordHashed,
            email,
            name,
            number,
        });
        // создаем контакт
        const { id: contactId } = yield model_1.ContactModel.create({
            name,
            number,
            userId: userRecord.id,
        });
        // добавляем id контакта для синхронизацией с пользователем, сохраняем изменения
        userRecord.constactId = contactId;
        userRecord.save();
        // в ответе возвращаем только токен
        return res.json(`Bearer ${helpers_1.generateJWT(userRecord)}`);
    }
    catch (error) {
        return getResponseError_1.getResponseError(res, error, 500);
    }
});
//# sourceMappingURL=controllers.js.map