"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const auth_service_1 = require("./auth.service");
const user_service_1 = require("../user/user.service");
const password_service_1 = require("../password/password.service");
const jwt_service_1 = require("../jwt/jwt.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../entities/user.entity");
const config_1 = require("@nestjs/config");
const user_entity_fixture_1 = require("../../entities/__fixtures__/user-entity.fixture");
describe('AuthService', () => {
    let authService;
    let userService;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                auth_service_1.AuthService,
                user_service_1.UserService,
                password_service_1.PasswordService,
                config_1.ConfigService,
                jwt_service_1.JwtService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(user_entity_1.UserEntity),
                    useValue: {},
                },
            ],
        }).compile();
        authService = module.get(auth_service_1.AuthService);
        userService = module.get(user_service_1.UserService);
    });
    it('should be defined', () => {
        expect(authService).toBeDefined();
    });
    describe('register', () => {
        it('should check for user existence', async () => {
            expect.assertions(3);
            const existSpy = jest
                .spyOn(userService, 'isUserExists')
                .mockResolvedValue(user_entity_fixture_1.mockUserEntity);
            const createSpy = jest.spyOn(userService, 'createUser');
            try {
                await authService.register({
                    email: 'email',
                    password: 'password',
                    lastName: 'lName',
                    firstName: 'fName',
                    businessName: 'bName',
                });
            }
            catch (e) {
                expect(e.message).toBe('User already exists');
            }
            expect(existSpy).toHaveBeenCalledWith('email');
            expect(createSpy).toHaveBeenCalledTimes(0);
        });
        it('should create user', async () => {
            const existSpy = jest
                .spyOn(userService, 'isUserExists')
                .mockResolvedValue(null);
            const createSpy = jest
                .spyOn(userService, 'createUser')
                .mockResolvedValue(new user_entity_1.UserEntity());
            const newUser = await authService.register({
                email: 'email',
                password: 'password',
                lastName: 'lName',
                firstName: 'fName',
                businessName: 'bName',
            });
            expect(newUser).toBeInstanceOf(user_entity_1.UserEntity);
            expect(existSpy).toHaveBeenCalledWith('email');
            expect(createSpy).toHaveBeenCalledWith({
                email: 'email',
                password: 'password',
                lastName: 'lName',
                firstName: 'fName',
            });
        });
    });
    describe('login', () => {
        it('should check for user existence', async () => {
            expect.assertions(2);
            const existSpy = jest
                .spyOn(userService, 'isUserExists')
                .mockResolvedValue(null);
            try {
                await authService.login({
                    email: 'email',
                    password: 'password',
                });
            }
            catch (e) {
                expect(e.message).toBe('Login failed');
            }
            expect(existSpy).toHaveBeenCalledWith('email');
        });
        it('should check for password correct', async () => {
            expect.assertions(3);
            const existSpy = jest
                .spyOn(userService, 'isUserExists')
                .mockResolvedValue(user_entity_fixture_1.mockUserEntity);
            const checkPassSpy = jest
                .spyOn(userService, 'checkUserPassword')
                .mockResolvedValue(false);
            try {
                await authService.login({
                    email: 'email',
                    password: 'password',
                });
            }
            catch (e) {
                expect(e.message).toBe('Incorrect password');
            }
            expect(existSpy).toHaveBeenCalledWith('email');
            expect(checkPassSpy).toHaveBeenCalledWith(user_entity_fixture_1.mockUserEntity, 'password');
        });
        it('should return session token', async () => {
            const existSpy = jest
                .spyOn(userService, 'isUserExists')
                .mockResolvedValue(user_entity_fixture_1.mockUserEntity);
            const checkPassSpy = jest
                .spyOn(userService, 'checkUserPassword')
                .mockResolvedValue(true);
            const userTokenSpy = jest
                .spyOn(userService, 'getUserToken')
                .mockReturnValue('mock-token');
            const userUpdateSpy = jest
                .spyOn(userService, 'updateUser')
                .mockResolvedValue(user_entity_fixture_1.mockUserEntity);
            const token = await authService.login({
                email: 'email',
                password: 'password',
            });
            expect(token).toBe('mock-token');
            expect(existSpy).toHaveBeenCalledWith('email');
            expect(checkPassSpy).toHaveBeenCalledWith(user_entity_fixture_1.mockUserEntity, 'password');
            expect(userTokenSpy).toHaveBeenCalledWith(user_entity_fixture_1.mockUserEntity);
            expect(userUpdateSpy).toHaveBeenCalledWith(Object.assign(Object.assign({}, user_entity_fixture_1.mockUserEntity), { token: 'mock-token' }));
        });
    });
});
//# sourceMappingURL=auth.service.spec.js.map