"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const create_user_dto_1 = require("./dto/create-user.dto");
const user_service_1 = require("./services/user/user.service");
const cloudinary_service_1 = require("../services/cloudinary/cloudinary.service");
let UserController = class UserController {
    constructor(userService, cloudinaryService) {
        this.userService = userService;
        this.cloudinaryService = cloudinaryService;
    }
    async create(createUserDto, files) {
        try {
            let profilePhotoUrl = "";
            if (files.profilePhoto && files.profilePhoto[0]) {
                const uploadResult = await this.cloudinaryService.uploadDocument(files.profilePhoto[0]);
                profilePhotoUrl = uploadResult.secure_url;
            }
            const user = await this.userService.create(Object.assign(Object.assign({}, createUserDto), { profilePhoto: profilePhotoUrl }));
            return {
                message: "User created successfully",
                user,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({
                message: "Failed to create user",
                errors: [error.message],
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        try {
            const users = await this.userService.findAll();
            return {
                message: "Users retrieved successfully",
                users,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                message: "Failed to fetch users",
                errors: [error.message],
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const user = await this.userService.findOne(+id);
            return {
                message: "User retrieved successfully",
                user,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({
                message: "Failed to fetch user",
                errors: [error.message],
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateUserDto, files) {
        try {
            let profilePhotoUrl = updateUserDto.profilePhoto;
            if (files.profilePhoto && files.profilePhoto[0]) {
                const uploadResult = await this.cloudinaryService.uploadDocument(files.profilePhoto[0]);
                profilePhotoUrl = uploadResult.secure_url;
            }
            const user = await this.userService.update(+id, Object.assign(Object.assign({}, updateUserDto), { profilePhoto: profilePhotoUrl }));
            return {
                message: "User updated successfully",
                user,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({
                message: "Failed to update user",
                errors: [error.message],
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            return await this.userService.remove(+id);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({
                message: "Failed to delete user",
                errors: [error.message],
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: "profilePhoto", maxCount: 1 }])),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: "profilePhoto", maxCount: 1 }])),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
UserController = __decorate([
    (0, common_1.Controller)("users"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __metadata("design:paramtypes", [user_service_1.UserService,
        cloudinary_service_1.CloudinaryService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map