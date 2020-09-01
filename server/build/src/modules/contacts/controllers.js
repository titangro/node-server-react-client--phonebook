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
exports.deleteContact = exports.updateContact = exports.getContact = exports.getContacts = exports.createContact = void 0;
const model_1 = require("./model");
const getResponseError_1 = require("helpers/getResponseError");
exports.createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { number, name, age, admin } = req.body;
        if (!number || !name) {
            return getResponseError_1.getResponseError(res, 'Where is data?!', 400);
        }
        // создаем контакт без привязки к пользователю
        const contact = yield model_1.ContactModel.create({
            name,
            number,
            age,
            admin,
        });
        // в ответе возвращаем контакт
        return res.json(contact);
    }
    catch (error) {
        return getResponseError_1.getResponseError(res, error, 500);
    }
});
exports.getContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // получаем список контактов
        const contacts = yield model_1.ContactModel.find({});
        res.json(contacts);
    }
    catch (error) {
        return getResponseError_1.getResponseError(res, error, 500);
    }
});
exports.getContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // получаение контакта по id
        const contactById = yield model_1.ContactModel.findById(req.params.id);
        if (!contactById) {
            // 404 ошибка если контакт не найден
            return getResponseError_1.getResponseError(res, 'No such contact', 404);
        }
        // возвращаем в ответе найденный контакт
        return res.json(contactById);
    }
    catch (error) {
        return getResponseError_1.getResponseError(res, `Is't corrent id. Error: ${error}`, 500);
    }
});
exports.updateContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // получение параметров для обновления
        const { number, name, age, admin } = req.body;
        // ищем контакт по id
        const contactById = yield model_1.ContactModel.findById(req.params.id);
        if (!contactById) {
            // 404 ошибка если контакт не найден
            return getResponseError_1.getResponseError(res, 'No such contact to update', 404);
        }
        // проходим по каждому параметру и, если он существует, - обновляем
        if (number) {
            contactById.number = number;
        }
        if (name) {
            contactById.name = name;
        }
        if (age) {
            contactById.age = age;
        }
        if (admin) {
            contactById.admin = admin;
        }
        // сохраняем имзененный контакт в базе
        yield contactById.save();
        // возвращаем обновленный контакт в ответе
        return res.json(contactById);
    }
    catch (error) {
        return getResponseError_1.getResponseError(res, error, 500);
    }
});
exports.deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // поиск и удаление контакта по id
        const contactById = yield model_1.ContactModel.findByIdAndDelete(req.params.id);
        if (!contactById) {
            // 404 ошибка если контакт не найден
            return getResponseError_1.getResponseError(res, 'No such contact to delete', 404);
        }
        // возвращаем удаленный контакт (можно возращать true)
        return res.json(contactById);
    }
    catch (error) {
        return getResponseError_1.getResponseError(res, error, 500);
    }
});
//# sourceMappingURL=controllers.js.map