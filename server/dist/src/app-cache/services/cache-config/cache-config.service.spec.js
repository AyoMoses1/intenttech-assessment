"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const cache_config_service_1 = require("./cache-config.service");
const config_1 = require("@nestjs/config");
const cache_manager_redis_store_1 = require("cache-manager-redis-store");
jest.mock('cache-manager-redis-store', () => ({
    redisStore: jest.fn(),
}));
describe('CacheConfigService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                cache_config_service_1.CacheConfigService,
                {
                    provide: config_1.ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue({
                            host: 'host',
                            port: 0,
                            password: 'password',
                        }),
                    },
                },
            ],
        }).compile();
        service = module.get(cache_config_service_1.CacheConfigService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should return redis config', async () => {
        const cacheOptions = service.createCacheOptions();
        await cacheOptions.store();
        const redisMock = jest.mocked(cache_manager_redis_store_1.redisStore);
        expect(redisMock).toHaveBeenCalledWith({
            socket: {
                host: 'host',
                port: 0,
            },
            password: 'password',
            ttl: 60 * 60,
        });
    });
});
//# sourceMappingURL=cache-config.service.spec.js.map