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
exports.createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { number, name, age, admin } = req.body;
        if (!number || !name) {
            return res.status(400).json({
                error: true,
                message: 'Where is data?!',
            });
        }
        const contact = yield model_1.ContactModel.create({
            name,
            number,
            age,
            admin,
        });
        return res.json(contact);
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: error,
        });
    }
});
exports.getContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield model_1.ContactModel.find({});
        res.json(contacts);
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: error,
        });
    }
});
exports.getContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactById = yield model_1.ContactModel.findById(req.params.id);
        if (!contactById) {
            return res.status(404).json({
                error: true,
                message: 'No such contact',
            });
        }
        return res.json(contactById);
    }
    catch (error) {
        return res.status(404).json({
            error: true,
            message: `Is't corrent id. Error: ${error}`,
        });
    }
});
exports.updateContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { number, name, age, admin } = req.body;
        const contactById = yield model_1.ContactModel.findById(req.params.id);
        if (!contactById) {
            return res.status(404).json({
                error: true,
                message: 'No such contact to update',
            });
        }
        contactById.number = number;
        contactById.name = name;
        if (age) {
            contactById.age = age;
        }
        if (admin) {
            contactById.admin = admin;
        }
        yield contactById.save();
        return res.json(contactById);
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: error,
        });
    }
});
exports.deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactById = yield model_1.ContactModel.findByIdAndDelete(req.params.id);
        if (!contactById) {
            return res.status(404).json({
                error: true,
                message: 'No such contact to delete',
            });
        }
        return res.json(contactById);
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: error,
        });
    }
});
