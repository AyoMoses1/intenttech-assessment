"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const user_controller_1 = require("./user.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_info_entity_1 = require("./entities/user-info.entity");
const user_contact_entity_1 = require("./entities/user-contact.entity");
const user_address_entity_1 = require("./entities/user-address.entity");
const user_academic_entity_1 = require("./entities/user-academic.entity");
const user_entity_fixture_1 = require("./entities/__fixtures__/user-entity.fixture");
const user_service_1 = require("./services/user/user.service");
describe("UserController", () => {
    let controller;
    let userService;
    const mockRepository = {
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        remove: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [user_controller_1.UserController],
            providers: [
                user_service_1.UserService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(user_info_entity_1.UserInfo),
                    useValue: mockRepository,
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(user_contact_entity_1.UserContact),
                    useValue: mockRepository,
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(user_address_entity_1.UserAddress),
                    useValue: mockRepository,
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(user_academic_entity_1.UserAcademic),
                    useValue: mockRepository,
                },
            ],
        }).compile();
        controller = module.get(user_controller_1.UserController);
        userService = module.get(user_service_1.UserService);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
    describe("create method", () => {
        it("should create a new user with all related information", async () => {
            const createUserDto = {
                profilePhoto: "https://example.com/photo.jpg",
                firstName: "John",
                lastName: "Doe",
                dob: new Date("1990-01-01"),
                occupation: "Software Engineer",
                gender: "Male",
                contact: {
                    email: "john.doe@example.com",
                    phoneNumber: "+1234567890",
                    fax: "123-456-7890",
                    linkedInUrl: "https://linkedin.com/in/johndoe",
                },
                address: {
                    address: "123 Main Street",
                    city: "New York",
                    state: "NY",
                    country: "USA",
                    zipCode: "10001",
                },
                academics: [
                    {
                        schoolName: "Harvard University",
                        degree: "Computer Science",
                        graduationYear: 2020,
                        description: "Graduated with honors",
                    },
                ],
            };
            jest
                .spyOn(userService, "create")
                .mockResolvedValue(user_entity_fixture_1.mockCompleteUserInfo);
            const result = await controller.create(createUserDto);
            expect(result).toEqual({
                message: "User created successfully",
                user: user_entity_fixture_1.mockCompleteUserInfo,
            });
        });
    });
    describe("findAll method", () => {
        it("should retrieve all users", async () => {
            const mockUsers = [user_entity_fixture_1.mockCompleteUserInfo];
            jest.spyOn(userService, "findAll").mockResolvedValue(mockUsers);
            const result = await controller.findAll();
            expect(result).toEqual({
                message: "Users retrieved successfully",
                users: mockUsers,
            });
        });
    });
    describe("findOne method", () => {
        it("should retrieve a single user", async () => {
            jest
                .spyOn(userService, "findOne")
                .mockResolvedValue(user_entity_fixture_1.mockCompleteUserInfo);
            const result = await controller.findOne("1");
            expect(result).toEqual({
                message: "User retrieved successfully",
                user: user_entity_fixture_1.mockCompleteUserInfo,
            });
        });
    });
    describe("update method", () => {
        it("should update a user", async () => {
            const updateUserDto = {
                firstName: "Jane",
                lastName: "Doe",
                dob: new Date("1990-01-01"),
                occupation: "Senior Engineer",
                gender: "Female",
                contact: {
                    email: "jane.doe@example.com",
                    phoneNumber: "+1987654321",
                    fax: undefined,
                    linkedInUrl: undefined,
                },
                address: {
                    address: "456 Market St",
                    city: "San Francisco",
                    state: "CA",
                    country: "USA",
                    zipCode: "94105",
                },
                academics: [
                    {
                        schoolName: "MIT",
                        degree: "Masters in CS",
                        graduationYear: 2022,
                        description: "With honors",
                    },
                ],
            };
            jest
                .spyOn(userService, "update")
                .mockResolvedValue(user_entity_fixture_1.mockCompleteUserInfo);
            const result = await controller.update("1", updateUserDto);
            expect(result).toEqual({
                message: "User updated successfully",
                user: user_entity_fixture_1.mockCompleteUserInfo,
            });
        });
    });
    describe("remove method", () => {
        it("should remove a user", async () => {
            jest.spyOn(userService, "remove").mockResolvedValue({
                message: "User deleted successfully",
            });
            const result = await controller.remove("1");
            expect(result).toEqual({
                message: "User deleted successfully",
            });
        });
    });
});
//# sourceMappingURL=user.controller.spec.js.map