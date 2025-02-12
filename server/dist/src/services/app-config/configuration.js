"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppEnv = exports.getConfig = void 0;
const getConfig = () => {
    return {
        port: parseInt(process.env.PORT, 10) || 3000,
        appEnv: process.env.APP_ENV,
        jwtSecret: process.env.JWT_SECRET,
        logLevel: process.env.LOG_LEVEL || "info",
        database: {
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10) || 5432,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            dbName: process.env.DB_NAME,
            isSync: process.env.DB_SYNC === "true",
        },
        cache: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT, 10) || 6379,
            password: process.env.REDIS_PASSWORD,
        },
        mail: {
            from: process.env.MAIL_FROM,
            transportOptions: {
                host: process.env.MAIL_HOST,
                port: parseInt(process.env.MAIL_PORT, 10),
                auth: {
                    user: process.env.MAIL_AUTH_USER,
                    pass: process.env.MAIL_AUTH_PASS,
                },
            },
        },
        cloudinary: {
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
            apiSecret: process.env.CLOUDINARY_API_SECRET,
        },
    };
};
exports.getConfig = getConfig;
var AppEnv;
(function (AppEnv) {
    AppEnv["DEV"] = "dev";
    AppEnv["TEST"] = "test";
    AppEnv["PROD"] = "production";
})(AppEnv = exports.AppEnv || (exports.AppEnv = {}));
//# sourceMappingURL=configuration.js.map