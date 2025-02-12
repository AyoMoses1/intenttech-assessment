import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./services/user/user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user-info.entity").UserInfo>;
    findAll(): Promise<import("./entities/user-info.entity").UserInfo[]>;
    findOne(id: string): Promise<import("./entities/user-info.entity").UserInfo>;
    update(id: string, updateUserDto: CreateUserDto): Promise<import("./entities/user-info.entity").UserInfo>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
