"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const jwt_service_1 = require("./jwt.service");
const config_1 = require("@nestjs/config");
jest.mock('jsonwebtoken', () => {
    return { sign: jest.fn().mockReturnValue('jwt') };
});
describe('JwtService', () => {
    let service;
    let config;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                jwt_service_1.JwtService,
                {
                    provide: config_1.ConfigService,
                    useValue: {
                        get: jest.fn(),
                    },
                },
            ],
        }).compile();
        service = module.get(jwt_service_1.JwtService);
        config = module.get(config_1.ConfigService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should be sign jwt tokens', () => {
        const configGetSpy = jest.spyOn(config, 'get').mockReturnValue('secret');
        expect(service.sign('payload')).toBe('jwt');
        expect(configGetSpy).toHaveBeenCalledWith('jwtSecret');
    });
});
//# sourceMappingURL=jwt.service.spec.js.map