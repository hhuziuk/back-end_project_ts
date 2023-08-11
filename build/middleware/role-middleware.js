"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_error_1 = __importDefault(require("../exceptions/api-error"));
var token_service_1 = __importDefault(require("../services/token-service"));
function default_1(role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            var token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return api_error_1.default.UnauthorizedError();
            }
            var decoded = token_service_1.default.validateAccessToken(token);
            if (decoded.role !== role) {
                return api_error_1.default.AccessDenied();
            }
            req.user = decoded;
            next();
        }
        catch (e) {
            return api_error_1.default.UnauthorizedError();
        }
    };
}
exports.default = default_1;
//# sourceMappingURL=role-middleware.js.map