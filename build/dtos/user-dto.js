"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserDto = /** @class */ (function () {
    function UserDto(model) {
        this.id = model.id;
        this.username = model.username;
        this.email = model.email;
        this.role = model.role;
        this.isActivated = model.isActivated;
    }
    return UserDto;
}());
exports.default = UserDto;
//# sourceMappingURL=user-dto.js.map