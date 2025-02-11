"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async_storage_middleware_1 = require("./async-storage.middleware");
const testing_1 = require("@nestjs/testing");
const constants_1 = require("../../constants");
jest.mock('node:crypto', () => ({
    randomUUID: jest.fn().mockReturnValue('mock-trace-id'),
}));
describe('AsyncStorageMiddleware', () => {
    let middleware;
    let storage;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                async_storage_middleware_1.AsyncStorageMiddleware,
                {
                    provide: constants_1.ASYNC_STORAGE,
                    useValue: {
                        run: (store, callback) => {
                            callback();
                        },
                    },
                },
            ],
        }).compile();
        middleware = module.get(async_storage_middleware_1.AsyncStorageMiddleware);
        storage = module.get(constants_1.ASYNC_STORAGE);
    });
    it('should be defined', () => {
        expect(middleware).toBeDefined();
    });
    it('should accept request id header', () => {
        const runSpy = jest.spyOn(storage, 'run');
        const nextMock = jest.fn();
        middleware.use({
            headers: { 'x-request-id': 'mocked' },
        }, null, nextMock);
        expect(nextMock).toHaveBeenCalledTimes(1);
        expect(runSpy).toHaveBeenCalledWith(new Map().set('traceId', 'mocked'), expect.anything());
    });
    it('should generate request id if no header found', () => {
        const runSpy = jest.spyOn(storage, 'run');
        const nextMock = jest.fn();
        middleware.use({
            headers: {},
        }, null, nextMock);
        expect(nextMock).toHaveBeenCalledTimes(1);
        expect(runSpy).toHaveBeenCalledWith(new Map().set('traceId', 'mock-trace-id'), expect.anything());
    });
});
//# sourceMappingURL=async-storage.middleware.spec.js.map