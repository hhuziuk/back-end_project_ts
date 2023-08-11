"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("../utils/logger"));
var api_error_1 = __importDefault(require("../exceptions/api-error"));
function default_1(error, req, res, next) {
    logger_1.default.error(error);
    logger_1.default.info(error);
    if (error instanceof api_error_1.default) {
        return res.status(error.status).json({ message: error.message, errors: error.errors });
    }
    return res.status(500).json({ message: 'unexpected error' });
}
exports.default = default_1;
//# sourceMappingURL=error-middleware.js.map