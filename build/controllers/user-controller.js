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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_service_1 = __importDefault(require("../services/user-service"));
var user_service_2 = __importDefault(require("../services/user-service"));
var user_entity_1 = require("../entities/user.entity");
var class_validator_1 = require("class-validator");
var api_error_1 = __importDefault(require("../exceptions/api-error"));
var class_transformer_1 = require("class-transformer");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.registration = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, username, password, user, errors, userData, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, email = _a.email, username = _a.username, password = _a.password;
                        user = (0, class_transformer_1.plainToClass)(user_entity_1.User, { email: email, username: username, password: password });
                        return [4 /*yield*/, (0, class_validator_1.validate)(user)];
                    case 1:
                        errors = _b.sent();
                        if (errors.length > 0) {
                            return [2 /*return*/, next(api_error_1.default.BadRequest('validation error', errors))];
                        }
                        return [4 /*yield*/, user_service_1.default.registration(email, username, password)];
                    case 2:
                        userData = _b.sent();
                        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                        return [2 /*return*/, res.json(userData)];
                    case 3:
                        e_1 = _b.sent();
                        next(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, username, password, user, errors, userData, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, email = _a.email, username = _a.username, password = _a.password;
                        user = (0, class_transformer_1.plainToClass)(user_entity_1.User, { email: email, username: username, password: password });
                        return [4 /*yield*/, (0, class_validator_1.validate)(user)];
                    case 1:
                        errors = _b.sent();
                        if (errors.length > 0) {
                            return [2 /*return*/, next(api_error_1.default.BadRequest('validation error', errors))];
                        }
                        return [4 /*yield*/, user_service_1.default.login(email, password)];
                    case 2:
                        userData = _b.sent();
                        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                        return [2 /*return*/, res.json(userData)];
                    case 3:
                        e_2 = _b.sent();
                        next(e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.logout = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, userData;
            return __generator(this, function (_a) {
                try {
                    refreshToken = req.cookies.refreshToken;
                    userData = user_service_1.default.logout(refreshToken);
                    res.clearCookie('userData');
                    return [2 /*return*/, res.json(userData)];
                }
                catch (e) {
                    next(e);
                }
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.activate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var activationLink, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        activationLink = req.params.link;
                        return [4 /*yield*/, user_service_2.default.activate(activationLink)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.redirect(process.env.CLIENT_URL)];
                    case 2:
                        e_3 = _a.sent();
                        next(e_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.refresh = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, userData, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        refreshToken = req.cookies.refreshToken;
                        return [4 /*yield*/, user_service_1.default.refresh(refreshToken)];
                    case 1:
                        userData = _a.sent();
                        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
                        return [2 /*return*/, res.json(userData)];
                    case 2:
                        e_4 = _a.sent();
                        next(e_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getUsers = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var users, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_service_2.default.getUsers()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, res.json(users)];
                    case 2:
                        e_5 = _a.sent();
                        next(e_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.default = new UserController();
//# sourceMappingURL=user-controller.js.map