"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_controller_1 = __importDefault(require("../controllers/user-controller"));
var auth_middleware_1 = __importDefault(require("../middleware/auth-middleware"));
var role_middleware_1 = __importDefault(require("../middleware/role-middleware"));
var router = express_1.default.Router();
router.post('/registration', user_controller_1.default.registration);
router.post('/login', user_controller_1.default.login);
router.post('/logout', user_controller_1.default.logout);
router.get('/activate/:link', user_controller_1.default.activate);
router.get('/refresh', user_controller_1.default.refresh);
router.get('/users', auth_middleware_1.default, (0, role_middleware_1.default)('ADMIN' || 'MODERATOR'), user_controller_1.default.getUsers);
exports.default = router;
//# sourceMappingURL=index.js.map