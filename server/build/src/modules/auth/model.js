"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: String,
    role: {
        type: String,
        default: 'user',
    },
    contactId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    number: {
        type: String,
        required: true,
    },
    groupsIds: {
        type: [mongoose_1.Schema.Types.ObjectId],
        default: [],
    },
});
exports.UserModel = mongoose_1.model('User', userSchema);
//# sourceMappingURL=model.js.map