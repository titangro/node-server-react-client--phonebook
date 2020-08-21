"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactModel = void 0;
const mongoose_1 = require("mongoose");
const contactSchema = new mongoose_1.Schema({
    number: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    age: Number,
    admin: {
        type: Boolean,
        default: false,
    },
});
exports.ContactModel = mongoose_1.model('Contact', contactSchema);
