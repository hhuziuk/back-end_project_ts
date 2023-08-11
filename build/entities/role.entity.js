"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("./user.entity");
var Role = exports.Role = /** @class */ (function () {
    function Role() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
        __metadata("design:type", Number)
    ], Role.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: false, unique: true }),
        __metadata("design:type", String)
    ], Role.prototype, "value", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: false }),
        __metadata("design:type", String)
    ], Role.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.roles; }),
        __metadata("design:type", user_entity_1.User)
    ], Role.prototype, "user", void 0);
    Role = __decorate([
        (0, typeorm_1.Entity)('Role'),
        (0, typeorm_1.Index)(['id', 'userId'])
    ], Role);
    return Role;
}());
//# sourceMappingURL=role.entity.js.map