"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModel = exports.values = void 0;
const mongoose_1 = require("mongoose");
exports.values = {
    labels: ['Family', 'Colleagues', 'Friends'],
    types: ['Open', 'Close'],
};
var GroupLabels;
(function (GroupLabels) {
    GroupLabels[GroupLabels["Family"] = 0] = "Family";
    GroupLabels[GroupLabels["Colleagues"] = 1] = "Colleagues";
    GroupLabels[GroupLabels["Friends"] = 2] = "Friends";
})(GroupLabels || (GroupLabels = {}));
var GroupTypes;
(function (GroupTypes) {
    GroupTypes[GroupTypes["Open"] = 0] = "Open";
    GroupTypes[GroupTypes["Close"] = 1] = "Close";
})(GroupTypes || (GroupTypes = {}));
const groupSchema = new mongoose_1.Schema({
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    contactsIds: {
        type: [mongoose_1.Types.ObjectId],
        default: [],
    },
});
exports.GroupModel = mongoose_1.model('Group', groupSchema);
//# sourceMappingURL=model.js.map