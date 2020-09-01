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
const model_2 = require("modules/auth/model");
const getResponseError_1 = require("helpers/getResponseError");
const model_3 = require("./model");
exports.createGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // получаем параметры из body
        const { label, type, contactsIds, user: { groupsIds, _id: userId }, } = req.body;
        // ищем созданные группы с таким же label
        const createdGroups = yield model_1.GroupModel.find({
            _id: {
                $in: groupsIds,
            },
            label,
        });
        if (groupsIds.length && createdGroups.length) {
            // ошбика если у этого пользователя такая группа уже существует
            return getResponseError_1.getResponseError(res, 'Group is already exist', 500);
        }
        // проверка, что label соответствует зарезервированным значениям
        if (!model_3.values.labels.includes(label)) {
            return getResponseError_1.getResponseError(res, `Group label must have one of required value: ${model_3.values.labels}`, 500);
        }
        // проверка, что type соответствует зарезервированным значениям
        if (!model_3.values.types.includes(type)) {
            return getResponseError_1.getResponseError(res, `Group type must have one of required value: ${model_3.values.types}`, 500);
        }
        // создаем группу
        const group = yield model_1.GroupModel.create({
            label,
            type,
            contactsIds,
        });
        // добавляем привязку по группе пользователю
        const currentUser = yield model_2.UserModel.findById(userId);
        (_a = currentUser.groupsIds) === null || _a === void 0 ? void 0 : _a.push(group._id);
        currentUser.save();
        // возвращаем группу в ответе
        res.json(group);
    }
    catch (error) {
        return getResponseError_1.getResponseError(res, error, 500);
    }
});
exports.getGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user: { groupsIds }, } = req.body;
        // получаем список групп
        const groups = yield model_1.GroupModel.find({
            _id: {
                $in: groupsIds,
            },
        });
        // возврщаем в ответе список групп
        res.json(groups);
    }
    catch (error) {
        return getResponseError_1.getResponseError(res, error, 500);
    }
});
exports.getGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user: { groupsIds }, } = req.body;
        const currentGroupId = req.params.id;
        if (!groupsIds.includes(currentGroupId)) {
            // исключение, если у пользователя нет группы с таким id
            return getResponseError_1.getResponseError(res, 'The user has no such group found', 500);
        }
        // получаение группы по id
        const groupById = yield model_1.GroupModel.findById(currentGroupId);
        if (!groupById) {
            return getResponseError_1.getResponseError(res, 'Group has not found', 404);
        }
        return res.json(groupById);
    }
    catch (error) {
        console.log('getGroup -> error', error);
        return getResponseError_1.getResponseError(res, error, 500);
    }
});
exports.updateGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user: { groupsIds }, } = req.body;
        const currentGroupId = req.params.id;
        if (!groupsIds.includes(currentGroupId)) {
            // исключение, если у пользователя нет группы с таким id
            return getResponseError_1.getResponseError(res, 'The user has no such group found', 500);
        }
        // получение параметров для обновления
        const { label, type, contactsIds } = req.body;
        // ищем контакт по id
        const groupById = yield model_1.GroupModel.findById(currentGroupId);
        if (!groupById) {
            // 404 ошибка если группа не найдена
            return getResponseError_1.getResponseError(res, 'No such group to update', 404);
        }
        // проверка, что label соответствует зарезервированным значениям
        if (!model_3.values.labels.includes(label)) {
            return getResponseError_1.getResponseError(res, `Group label must have one of required value: ${model_3.values.labels}`, 500);
        }
        // проверка, что type соответствует зарезервированным значениям
        if (!model_3.values.types.includes(type)) {
            return getResponseError_1.getResponseError(res, `Group type must have one of required value: ${model_3.values.types}`, 500);
        }
        // ищем созданные группы с таким же label
        const createdGroups = yield model_1.GroupModel.find({
            _id: {
                $in: groupsIds,
            },
            label,
        });
        // сравниваем что label не из действующей группы
        const createdLabels = createdGroups
            .map((item) => item.label)
            .includes(groupById.label);
        if (createdGroups.length && !createdLabels) {
            // ошбика если у этого пользователя такая группа уже существует
            return getResponseError_1.getResponseError(res, 'Group is already exist', 500);
        }
        // проходим по каждому параметру и, если он существует, - обновляем
        if (label) {
            groupById.label = label;
        }
        if (type) {
            groupById.type = type;
        }
        if (contactsIds) {
            groupById.contactsIds = contactsIds;
        }
        // сохраняем имзененную группу в базе
        yield groupById.save();
        // возвращаем обновленную группу в ответе
        return res.json(groupById);
    }
    catch (error) {
        return getResponseError_1.getResponseError(res, error, 500);
    }
});
exports.deleteGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { user: { groupsIds, _id: userId }, } = req.body;
        const currentGroupId = req.params.id;
        if (!groupsIds.includes(currentGroupId)) {
            // исключение, если у пользователя нет группы с таким id
            return getResponseError_1.getResponseError(res, 'The user has no such group found', 500);
        }
        // поиск и удаление группы по id
        const groupById = yield model_1.GroupModel.findByIdAndDelete(currentGroupId);
        if (!groupById) {
            // 404 ошибка если группа не найдена
            return getResponseError_1.getResponseError(res, 'No such group to delete', 404);
        }
        // удаляем привязку по группе пользователю
        const currentUser = yield model_2.UserModel.findById(userId);
        currentUser.groupsIds = (_b = currentUser.groupsIds) === null || _b === void 0 ? void 0 : _b.filter((id) => id !== groupById._id);
        currentUser.save();
        // возвращаем удаленный контакт (можно возращать true)
        return res.json(groupById);
    }
    catch (error) {
        return getResponseError_1.getResponseError(res, error, 500);
    }
});
//# sourceMappingURL=controllers.js.map