import { CreateUserDto } from '../../dto/create-user.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from '../../dto/login.dto';
import { UserEntity } from '../../entities/user.entity';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UserService);
    register(userDto: CreateUserDto): Promise<UserEntity>;
    login(loginRequest: LoginDto): Promise<string | void>;
    private failLogin;
}
