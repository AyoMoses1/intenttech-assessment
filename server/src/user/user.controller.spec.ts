import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserInfo } from "./entities/user-info.entity";
import { UserContact } from "./entities/user-contact.entity";
import { UserAddress } from "./entities/user-address.entity";
import { UserAcademic } from "./entities/user-academic.entity";
import { mockCompleteUserInfo } from "./entities/__fixtures__/user-entity.fixture";
import { UserService } from "./services/user/user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { CloudinaryService } from "src/services/cloudinary/cloudinary.service";

describe("UserController", () => {
  let controller: UserController;
  let userService: UserService;
  let cloudinaryService: CloudinaryService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    remove: jest.fn(),
  };

  const mockCloudinaryService = {
    uploadImage: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: CloudinaryService,
          useValue: mockCloudinaryService,
        },
        {
          provide: getRepositoryToken(UserInfo),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(UserContact),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(UserAddress),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(UserAcademic),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    cloudinaryService = module.get<CloudinaryService>(CloudinaryService);
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

      const mockFiles = {
        profilePhoto: [
          {
            fieldname: "profilePhoto",
            originalname: "test.jpg",
            buffer: Buffer.from("test"),
          } as Express.Multer.File,
        ],
      };

      mockCloudinaryService.uploadImage.mockResolvedValue({
        secure_url: "https://example.com/uploaded-photo.jpg",
      });

      jest
        .spyOn(userService, "create")
        .mockResolvedValue(mockCompleteUserInfo as UserInfo);

      const result = await controller.create(createUserDto, mockFiles);

      expect(result).toEqual({
        message: "User created successfully",
        user: mockCompleteUserInfo,
      });
    });
  });

  describe("findAll method", () => {
    it("should retrieve all users", async () => {
      const mockUsers = [mockCompleteUserInfo] as UserInfo[];
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
        .mockResolvedValue(mockCompleteUserInfo as UserInfo);

      const result = await controller.findOne("1");

      expect(result).toEqual({
        message: "User retrieved successfully",
        user: mockCompleteUserInfo,
      });
    });
  });

  describe("update method", () => {
    it("should update a user", async () => {
      const updateUserDto: CreateUserDto = {
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

      const mockFiles = {
        profilePhoto: [
          {
            fieldname: "profilePhoto",
            originalname: "test.jpg",
            buffer: Buffer.from("test"),
          } as Express.Multer.File,
        ],
      };

      mockCloudinaryService.uploadImage.mockResolvedValue({
        secure_url: "https://example.com/uploaded-photo.jpg",
      });

      jest
        .spyOn(userService, "update")
        .mockResolvedValue(mockCompleteUserInfo as UserInfo);

      const result = await controller.update("1", updateUserDto, mockFiles);

      expect(result).toEqual({
        message: "User updated successfully",
        user: mockCompleteUserInfo,
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
