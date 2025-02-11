"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const user_service_1 = require("./user.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_info_entity_1 = require("../../entities/user-info.entity");
const user_contact_entity_1 = require("../../entities/user-contact.entity");
const user_address_entity_1 = require("../../entities/user-address.entity");
const user_academic_entity_1 = require("../../entities/user-academic.entity");
const user_entity_fixture_1 = require("../../entities/__fixtures__/user-entity.fixture");
describe("UserService", () => {
    let service;
    let userInfoRepo;
    let userContactRepo;
    let userAddressRepo;
    let userAcademicRepo;
    const mockRepository = {
        find: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        remove: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                user_service_1.UserService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(user_info_entity_1.UserInfo),
                    useValue: Object.assign({}, mockRepository),
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(user_contact_entity_1.UserContact),
                    useValue: Object.assign({}, mockRepository),
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(user_address_entity_1.UserAddress),
                    useValue: Object.assign({}, mockRepository),
                },
                {
                    provide: (0, typeorm_1.getRepositoryToken)(user_academic_entity_1.UserAcademic),
                    useValue: Object.assign({}, mockRepository),
                },
            ],
        }).compile();
        service = module.get(user_service_1.UserService);
        userInfoRepo = module.get((0, typeorm_1.getRepositoryToken)(user_info_entity_1.UserInfo));
        userContactRepo = module.get((0, typeorm_1.getRepositoryToken)(user_contact_entity_1.UserContact));
        userAddressRepo = module.get((0, typeorm_1.getRepositoryToken)(user_address_entity_1.UserAddress));
        userAcademicRepo = module.get((0, typeorm_1.getRepositoryToken)(user_academic_entity_1.UserAcademic));
    });
    it("should be defined", () => {
        expect(service).toBeDefined();
    });
    describe("create", () => {
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
                .spyOn(userInfoRepo, "create")
                .mockReturnValue(user_entity_fixture_1.mockUserInfo);
            jest
                .spyOn(userInfoRepo, "save")
                .mockResolvedValue(user_entity_fixture_1.mockUserInfo);
            jest
                .spyOn(userContactRepo, "create")
                .mockReturnValue(user_entity_fixture_1.mockUserInfo.contact);
            jest
                .spyOn(userContactRepo, "save")
                .mockResolvedValue(user_entity_fixture_1.mockUserInfo.contact);
            jest
                .spyOn(userAddressRepo, "create")
                .mockReturnValue(user_entity_fixture_1.mockUserInfo.address);
            jest
                .spyOn(userAddressRepo, "save")
                .mockResolvedValue(user_entity_fixture_1.mockUserInfo.address);
            jest
                .spyOn(userAcademicRepo, "create")
                .mockReturnValue(user_entity_fixture_1.mockUserInfo.academics[0]);
            jest
                .spyOn(userAcademicRepo, "save")
                .mockResolvedValue([user_entity_fixture_1.mockUserInfo.academics[0]]);
            const result = await service.create(createUserDto);
            expect(result).toEqual(user_entity_fixture_1.mockUserInfo);
        });
    });
    describe("findAll", () => {
        it("should return an array of users", async () => {
            jest
                .spyOn(userInfoRepo, "find")
                .mockResolvedValue([user_entity_fixture_1.mockCompleteUserInfo]);
            const result = await service.findAll();
            expect(result).toEqual([user_entity_fixture_1.mockCompleteUserInfo]);
            expect(userInfoRepo.find).toHaveBeenCalledWith({
                relations: ["contact", "address", "academics"],
            });
        });
    });
    describe("findOne", () => {
        it("should return a single user", async () => {
            jest
                .spyOn(userInfoRepo, "findOne")
                .mockResolvedValue(user_entity_fixture_1.mockCompleteUserInfo);
            const result = await service.findOne(1);
            expect(result).toEqual(user_entity_fixture_1.mockCompleteUserInfo);
            expect(userInfoRepo.findOne).toHaveBeenCalledWith({
                where: { id: 1 },
                relations: ["contact", "address", "academics"],
            });
        });
    });
    describe("update", () => {
        it("should update a user and related information", async () => {
            const updateUserDto = {
                firstName: "Jane",
                lastName: "Doe",
                dob: new Date("1990-01-01"),
                occupation: "Senior Engineer",
                gender: "Female",
                contact: {
                    email: "jane.doe@example.com",
                    phoneNumber: "+1987654321",
                    fax: null,
                    linkedInUrl: null,
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
                .spyOn(userInfoRepo, "findOne")
                .mockResolvedValue(user_entity_fixture_1.mockUserInfo);
            jest
                .spyOn(userInfoRepo, "save")
                .mockResolvedValue(user_entity_fixture_1.mockCompleteUserInfo);
            jest
                .spyOn(userContactRepo, "update")
                .mockResolvedValue({ affected: 1, raw: {} });
            jest
                .spyOn(userAddressRepo, "update")
                .mockResolvedValue({ affected: 1, raw: {} });
            jest
                .spyOn(userAcademicRepo, "delete")
                .mockResolvedValue({ affected: 1, raw: {} });
            jest
                .spyOn(userAcademicRepo, "save")
                .mockResolvedValue([user_entity_fixture_1.mockUserInfo.academics[0]]);
            const result = await service.update(1, updateUserDto);
            expect(result).toEqual(user_entity_fixture_1.mockCompleteUserInfo);
        });
    });
    describe("remove", () => {
        it("should remove a user and all related information", async () => {
            jest
                .spyOn(userInfoRepo, "findOne")
                .mockResolvedValue(user_entity_fixture_1.mockCompleteUserInfo);
            jest
                .spyOn(userInfoRepo, "remove")
                .mockResolvedValue(user_entity_fixture_1.mockCompleteUserInfo);
            await service.remove(1);
            expect(userInfoRepo.remove).toHaveBeenCalledWith(user_entity_fixture_1.mockCompleteUserInfo);
        });
    });
});
//# sourceMappingURL=user.service.spec.js.map