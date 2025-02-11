"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
const configuration_1 = require("./src/services/app-config/configuration");
dotenv.config();
const { database: { host, port, password, user, dbName }, } = (0, configuration_1.getConfig)();
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host,
    port,
    username: user,
    password,
    database: dbName,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/**/migrations/*.ts'],
    subscribers: ['src/**/subscribers/*.ts'],
});
//# sourceMappingURL=type-orm.config.js.map