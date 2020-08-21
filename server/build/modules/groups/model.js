"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModel = void 0;
const mongoose_1 = require("mongoose");
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
    label: String,
    type: String,
    contacts: {
        type: [mongoose_1.Types.ObjectId],
    },
});
exports.GroupModel = mongoose_1.model('Group', groupSchema);
