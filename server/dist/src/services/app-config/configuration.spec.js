"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configuration_1 = require("./configuration");
const fs_1 = require("fs");
const path_1 = require("path");
describe('config helper', () => {
    it('should be defined', () => {
        expect(configuration_1.getConfig).toBeDefined();
    });
    it('should return configs', () => {
        const env = (0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), '.env.example'), 'utf8')
            .split('\n')
            .reduce((vars, i) => {
            const [variable, value] = i.split('=');
            vars[variable] = value;
            return vars;
        }, {});
        process.env = Object.assign(process.env, env);
        expect((0, configuration_1.getConfig)()).toStrictEqual({
            cache: {
                host: 'localhost',
                password: '',
                port: 6379,
            },
            database: {
                dbName: 'api',
                host: 'localhost',
                password: 'secret',
                port: 5432,
                user: 'postgres',
            },
            appEnv: 'dev',
            jwtSecret: 'secret',
            logLevel: 'debug',
            port: 3000,
            mail: {
                from: 'no-reply@la-sella.smtp.com',
                transportOptions: {
                    auth: {
                        pass: 'any-password',
                        user: 'any-user',
                    },
                    host: '127.0.0.1',
                    port: 1025,
                },
            },
        });
    });
});
//# sourceMappingURL=configuration.spec.js.map