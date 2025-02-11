"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./user/user.module");
const config_1 = require("@nestjs/config");
const db_module_1 = require("./db/db.module");
const configuration_1 = require("./services/app-config/configuration");
const app_cache_module_1 = require("./app-cache/app-cache.module");
const logger_module_1 = require("./logger/logger.module");
const async_storage_middleware_1 = require("./global/middleware/async-storage/async-storage.middleware");
const global_module_1 = require("./global/global.module");
const health_module_1 = require("./health/health.module");
const throttler_1 = require("@nestjs/throttler");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(async_storage_middleware_1.AsyncStorageMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            global_module_1.GlobalModule,
            config_1.ConfigModule.forRoot({
                cache: true,
                load: [configuration_1.getConfig],
            }),
            db_module_1.DbModule,
            app_cache_module_1.AppCacheModule,
            user_module_1.UserModule,
            config_1.ConfigModule,
            logger_module_1.LoggerModule,
            health_module_1.HealthModule,
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60,
                    limit: 10,
                },
            ]),
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map