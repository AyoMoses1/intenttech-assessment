/// <reference types="multer" />
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./services/user/user.service";
import { UserInfo } from "./entities/user-info.entity";
import { CloudinaryService } from "src/services/cloudinary/cloudinary.service";
export declare class UserController {
    private readonly userService;
    private readonly cloudinaryService;
    constructor(userService: UserService, cloudinaryService: CloudinaryService);
    create(createUserDto: CreateUserDto, files?: {
        profilePhoto?: Express.Multer.File[];
    }): Promise<{
        message: string;
        user: UserInfo;
    }>;
    findAll(): Promise<{
        message: string;
        users: UserInfo[];
    }>;
    findOne(id: string): Promise<{
        message: string;
        user: UserInfo;
    }>;
    update(id: string, updateUserDto: CreateUserDto, files?: {
        profilePhoto?: Express.Multer.File[];
    }): Promise<{
        message: string;
        user: UserInfo;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
