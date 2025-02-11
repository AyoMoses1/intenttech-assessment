"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const cache_health_indicator_1 = require("./cache.health-indicator");
const cache_manager_1 = require("@nestjs/cache-manager");
const cache_mock_1 = require("../../../../test/test-utils/cache.mock");
describe('CacheHealthIndicator', () => {
    let service;
    let cacheManagerMock;
    beforeEach(async () => {
        cacheManagerMock = (0, cache_mock_1.getCacheMock)();
        const moduleRef = await testing_1.Test.createTestingModule({
            controllers: [cache_health_indicator_1.CacheHealthIndicator],
            providers: [{ provide: cache_manager_1.CACHE_MANAGER, useValue: cacheManagerMock }],
        }).compile();
        service = moduleRef.get(cache_health_indicator_1.CacheHealthIndicator);
    });
    describe('isHealthy', () => {
        it('should return cache health check result', async () => {
            cacheManagerMock.set.mockResolvedValueOnce('true');
            cacheManagerMock.get.mockResolvedValueOnce('true');
            const result = await service.isHealthy();
            expect(result).toEqual({ cache: { status: 'up' } });
        });
        it('should return cache health error result', async () => {
            cacheManagerMock.set.mockResolvedValueOnce('true');
            cacheManagerMock.get.mockResolvedValueOnce('false');
            await expect(service.isHealthy()).rejects.toThrowError('CacheHealthIndicator failed');
        });
    });
});
//# sourceMappingURL=cache.health-indicator.spec.js.map