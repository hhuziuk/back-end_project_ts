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
exports.User = void 0;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var role_entity_1 = require("./role.entity");
var User = exports.User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: false, unique: true }),
        (0, class_validator_1.MinLength)(1, {
            message: 'username is too short',
        }),
        (0, class_validator_1.MaxLength)(15, {
            message: 'username is too long',
        }),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: false }),
        (0, class_validator_1.MinLength)(4, {
            message: 'password is too short',
        }),
        (0, class_validator_1.MaxLength)(15, {
            message: 'password is too long',
        }),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: false, unique: true }),
        (0, class_validator_1.IsEmail)(),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: false }),
        __metadata("design:type", Boolean)
    ], User.prototype, "isActivated", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "activationLink", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return role_entity_1.Role; }, function (userRole) { return userRole; }),
        __metadata("design:type", Array)
    ], User.prototype, "roles", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)('User')
    ], User);
    return User;
}());
//# sourceMappingURL=user.entity.js.map