"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const password_service_1 = require("./password.service");
const bcryptjs_1 = require("bcryptjs");
jest.mock('bcryptjs', () => ({
    hash: jest.fn(),
    compare: jest.fn(),
}));
describe('PasswordService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [password_service_1.PasswordService],
        }).compile();
        service = module.get(password_service_1.PasswordService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should generate passwords', async () => {
        const hashMock = jest.mocked(bcryptjs_1.hash);
        hashMock.mockResolvedValue('mock-password');
        expect(await service.generate('password')).toBe('mock-password');
    });
    it('should compare password hash', async () => {
        const compareMock = jest.mocked(bcryptjs_1.compare);
        compareMock.mockResolvedValue(true);
        expect(await service.compare('password', 'hash')).toBe(true);
    });
});
//# sourceMappingURL=password.service.spec.js.map