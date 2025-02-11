"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const health_controller_1 = require("./health.controller");
const terminus_1 = require("@nestjs/terminus");
const cache_health_indicator_1 = require("./indicators/cache/cache.health-indicator");
describe('HealthController', () => {
    let healthController;
    let healthCheckService;
    let cacheHealthIndicator;
    let typeOrmHealthIndicator;
    beforeEach(async () => {
        healthCheckService = {
            check: jest.fn(),
        };
        typeOrmHealthIndicator = {
            pingCheck: jest.fn(),
        };
        cacheHealthIndicator = {
            isHealthy: jest.fn(),
        };
        const moduleRef = await testing_1.Test.createTestingModule({
            controllers: [health_controller_1.HealthController],
            providers: [
                { provide: terminus_1.HealthCheckService, useValue: healthCheckService },
                { provide: terminus_1.TypeOrmHealthIndicator, useValue: typeOrmHealthIndicator },
                { provide: cache_health_indicator_1.CacheHealthIndicator, useValue: cacheHealthIndicator },
            ],
        }).compile();
        healthController = moduleRef.get(health_controller_1.HealthController);
        healthCheckService = moduleRef.get(terminus_1.HealthCheckService);
        typeOrmHealthIndicator = moduleRef.get(terminus_1.TypeOrmHealthIndicator);
    });
    describe('healthCheck', () => {
        it('should return health check result', async () => {
            cacheHealthIndicator.isHealthy.mockResolvedValue({
                cache: {
                    status: 'up',
                },
            });
            const healthCheckResult = {
                status: 'ok',
                details: {
                    db: {
                        status: 'up',
                    },
                    cache: {
                        status: 'up',
                    },
                },
            };
            healthCheckService.check.mockImplementation(async (props) => {
                props.forEach((propFunction) => propFunction());
                return healthCheckResult;
            });
            typeOrmHealthIndicator.pingCheck.mockReturnValue(true);
            const result = await healthController.healthCheck();
            expect(healthCheckService.check).toHaveBeenCalledWith([
                expect.any(Function),
                expect.any(Function),
            ]);
            expect(typeOrmHealthIndicator.pingCheck).toHaveBeenCalledWith('db');
            expect(result).toEqual(healthCheckResult);
        });
    });
});
//# sourceMappingURL=health.controller.spec.js.map