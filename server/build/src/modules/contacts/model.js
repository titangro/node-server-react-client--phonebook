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
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
});
exports.ContactModel = mongoose_1.model('Contact', contactSchema);
//# sourceMappingURL=model.js.map