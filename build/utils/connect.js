"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDataSource = void 0;
var ormconfig_1 = __importDefault(require("../ormconfig"));
require('dotenv').config();
require("reflect-metadata");
var typeorm_1 = require("typeorm");
exports.PostgresDataSource = new typeorm_1.DataSource(ormconfig_1.default);
//# sourceMappingURL=connect.js.map