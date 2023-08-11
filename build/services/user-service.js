"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var user_dto_1 = __importDefault(require("../dtos/user-dto"));
var user_entity_1 = require("../entities/user.entity");
var connect_1 = require("../utils/connect");
var bcrypt_1 = __importDefault(require("bcrypt"));
var uuid_1 = require("uuid");
var mail_service_1 = __importDefault(require("./mail-service"));
var token_service_1 = __importDefault(require("./token-service"));
var api_error_1 = __importDefault(require("../exceptions/api-error"));
var logger_1 = __importDefault(require("../utils/logger"));
var role_entity_1 = require("../entities/role.entity");
var userRepository = connect_1.PostgresDataSource.getRepository(user_entity_1.User);
var roleRepository = connect_1.PostgresDataSource.getRepository(role_entity_1.Role);
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.registration = function (email, username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var candidate, hashPassword, activationLink, userRole, user, userDto, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.findOne({ where: { email: email } })];
                    case 1:
                        candidate = _a.sent();
                        if (candidate) {
                            throw api_error_1.default.BadRequest("User with the same ".concat(email, " already exists"));
                        }
                        logger_1.default.info(candidate);
                        return [4 /*yield*/, bcrypt_1.default.hash(password, 8)];
                    case 2:
                        hashPassword = _a.sent();
                        activationLink = (0, uuid_1.v4)();
                        return [4 /*yield*/, roleRepository.findOne({
                                where: { value: "USER" },
                            })];
                    case 3:
                        userRole = _a.sent();
                        return [4 /*yield*/, userRepository.create({ email: email, username: username, password: hashPassword, activationLink: activationLink })];
                    case 4:
                        user = _a.sent();
                        return [4 /*yield*/, userRepository.save(user)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, mail_service_1.default.sendActivationMail(email, "".concat(process.env.API_URL, "/api/activate/").concat(activationLink))];
                    case 6:
                        _a.sent();
                        userDto = new user_dto_1.default(user) // id, email, role, isActivated
                        ;
                        tokens = token_service_1.default.generateTokens(__assign({}, userDto));
                        return [4 /*yield*/, token_service_1.default.saveToken(userDto.id, tokens.refreshToken)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, __assign(__assign({}, tokens), { user: userDto })];
                }
            });
        });
    };
    UserService.prototype.activate = function (activationLink) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.findOne({ where: { activationLink: activationLink } })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw api_error_1.default.BadRequest("activation link is not correct");
                        }
                        user.isActivated = true;
                        return [4 /*yield*/, userRepository.save(user)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, comparePassword, userDto, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.findOne({
                            where: { email: email }
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw api_error_1.default.BadRequest("User with this email does not exist");
                        }
                        return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                    case 2:
                        comparePassword = _a.sent();
                        if (!comparePassword) {
                            throw api_error_1.default.BadRequest("Wrong password");
                        }
                        userDto = new user_dto_1.default(user) // id, email, isActivated
                        ;
                        tokens = token_service_1.default.generateTokens(__assign({}, userDto));
                        return [4 /*yield*/, token_service_1.default.saveToken(userDto.id, tokens.refreshToken)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, __assign(__assign({}, tokens), { user: userDto })];
                }
            });
        });
    };
    UserService.prototype.logout = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, token_service_1.default.removeToken(refreshToken)];
                    case 1:
                        token = _a.sent();
                        return [2 /*return*/, token];
                }
            });
        });
    };
    UserService.prototype.refresh = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, tokenFromDatabase, user, userDto, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!refreshToken) {
                            throw api_error_1.default.UnauthorizedError();
                        }
                        userData = token_service_1.default.validateRefreshToken(refreshToken);
                        return [4 /*yield*/, token_service_1.default.findToken(refreshToken)];
                    case 1:
                        tokenFromDatabase = _a.sent();
                        if (!userData || !tokenFromDatabase) {
                            throw api_error_1.default.UnauthorizedError();
                        }
                        return [4 /*yield*/, userRepository.findOneOrFail({
                                where: { id: userData.id },
                                select: {
                                    id: true,
                                    email: true,
                                    username: true,
                                    isActivated: true
                                }
                            })
                            //logger.info(user)
                        ];
                    case 2:
                        user = _a.sent();
                        userDto = new user_dto_1.default(user);
                        tokens = token_service_1.default.generateTokens(__assign({}, userDto));
                        return [4 /*yield*/, token_service_1.default.saveToken(userDto.id, tokens.refreshToken)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, __assign(__assign({}, tokens), { user: userDto })];
                }
            });
        });
    };
    UserService.prototype.getUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.find()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                }
            });
        });
    };
    return UserService;
}());
exports.default = new UserService();
//# sourceMappingURL=user-service.js.map