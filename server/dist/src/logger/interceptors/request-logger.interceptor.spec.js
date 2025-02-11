"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_logger_interceptor_1 = require("./request-logger.interceptor");
const testing_1 = require("@nestjs/testing");
describe('RequestLoggerInterceptor', () => {
    let interceptor;
    let loggerMock;
    beforeEach(async () => {
        loggerMock = {
            error: jest.fn(),
            warn: jest.fn(),
            log: jest.fn(),
        };
        const module = await testing_1.Test.createTestingModule({
            providers: [request_logger_interceptor_1.RequestLoggerInterceptor],
        })
            .setLogger(loggerMock)
            .compile();
        interceptor = module.get(request_logger_interceptor_1.RequestLoggerInterceptor);
    });
    it('should be defined', () => {
        expect(interceptor).toBeDefined();
    });
    it('should log incoming request', () => {
        const nextMock = {
            handle: jest.fn(),
        };
        const requestMock = () => ({
            method: 'test-method',
            url: 'test-url',
            query: 'test-query',
            body: 'test-body',
        });
        const contextMock = {
            switchToHttp: () => ({
                getRequest: requestMock,
            }),
        };
        interceptor.intercept(contextMock, nextMock);
        expect(nextMock.handle).toHaveBeenCalledTimes(1);
        expect(loggerMock.log).toHaveBeenCalledWith('{"message":"test-method test-url REQUEST","query":"test-query","body":"test-body"}', 'RequestLoggerInterceptor');
    });
});
//# sourceMappingURL=request-logger.interceptor.spec.js.map