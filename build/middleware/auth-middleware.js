"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_error_1 = __importDefault(require("../exceptions/api-error"));
var token_service_1 = __importDefault(require("../services/token-service"));
function authMiddleware(req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(api_error_1.default.UnauthorizedError());
        }
        var accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(api_error_1.default.UnauthorizedError());
        }
        var userData = token_service_1.default.validateAccessToken(accessToken);
        if (!userData) {
            return next(api_error_1.default.UnauthorizedError());
        }
        req.user = userData;
        next();
    }
    catch (e) {
        next(e);
    }
}
exports.default = authMiddleware;
//# sourceMappingURL=auth-middleware.js.map