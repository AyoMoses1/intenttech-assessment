"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const config_1 = require("@nestjs/config");
const jwt_strategy_1 = require("./jwt.strategy");
describe('JWT Strategy', () => {
    let strategy;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                jwt_strategy_1.JwtStrategy,
                {
                    provide: config_1.ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue('secret'),
                    },
                },
            ],
        }).compile();
        strategy = module.get(jwt_strategy_1.JwtStrategy);
    });
    it('should be defined', () => {
        expect(strategy).toBeDefined();
    });
    it('should return payload on validate', async () => {
        expect(await strategy.validate('payload')).toBe('payload');
    });
});
//# sourceMappingURL=jwt.strategy.spec.js.map