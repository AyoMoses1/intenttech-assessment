"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const app_logger_service_1 = require("./app-logger.service");
const constants_1 = require("../../../global/constants");
const config_1 = require("@nestjs/config");
const pino_1 = require("pino");
jest.mock('pino', () => ({
    pino: jest.fn(),
}));
describe('AppLoggerService', () => {
    const setUpModule = async () => {
        const storeMap = new Map();
        storeMap.set('traceId', 'uuid');
        return await testing_1.Test.createTestingModule({
            providers: [
                app_logger_service_1.AppLoggerService,
                {
                    provide: constants_1.ASYNC_STORAGE,
                    useValue: {
                        getStore: jest.fn().mockReturnValue(storeMap),
                    },
                },
                {
                    provide: config_1.ConfigService,
                    useValue: {
                        get: jest.fn().mockImplementation((key) => {
                            switch (key) {
                                case 'logLevel':
                                    return 'debug';
                                case 'appEnv':
                                    return 'dev';
                            }
                        }),
                    },
                },
            ],
        }).compile();
    };
    it('should be defined', async () => {
        const pinoMock = jest.mocked(pino_1.pino);
        const module = await setUpModule();
        const service = module.get(app_logger_service_1.AppLoggerService);
        expect(service).toBeDefined();
        expect(pinoMock).toHaveBeenCalledWith({
            level: 'debug',
            transport: {
                target: 'pino-pretty',
            },
        });
    });
    it('should define error logger', async () => {
        const pinoMock = jest.mocked(pino_1.pino);
        const errorMock = jest.fn();
        pinoMock.mockReturnValueOnce({
            error: errorMock,
        });
        const module = await setUpModule();
        const service = module.get(app_logger_service_1.AppLoggerService);
        service.error('message', 'trace', 'context');
        expect(errorMock).toHaveBeenCalledWith({ traceId: 'uuid' }, '[context] message');
        expect(errorMock).toHaveBeenCalledWith('trace');
    });
    it('should define info logger', async () => {
        const pinoMock = jest.mocked(pino_1.pino);
        const logMock = jest.fn();
        pinoMock.mockReturnValueOnce({
            info: logMock,
        });
        const module = await setUpModule();
        const service = module.get(app_logger_service_1.AppLoggerService);
        service.log('message', 'context');
        expect(logMock).toHaveBeenCalledWith({ traceId: 'uuid' }, '[context] message');
    });
    it('should define warn logger', async () => {
        const pinoMock = jest.mocked(pino_1.pino);
        const logMock = jest.fn();
        pinoMock.mockReturnValueOnce({
            warn: logMock,
        });
        const module = await setUpModule();
        const service = module.get(app_logger_service_1.AppLoggerService);
        service.warn('message', 'context');
        expect(logMock).toHaveBeenCalledWith({ traceId: 'uuid' }, '[context] message');
    });
});
//# sourceMappingURL=app-logger.service.spec.js.map