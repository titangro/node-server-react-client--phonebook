"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    return (req, res, next) => {
        console.log('Required role?');
        if (req.body.admin) {
            return res.status(401).end();
        }
        else {
            console.log('User meet required role, going to next middleware');
            return next();
        }
    };
};
//# sourceMappingURL=checkRole.js.map