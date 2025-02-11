import { Repository } from "typeorm";
import { UserInfo } from "src/user/entities/user-info.entity";
import { UserAddress } from "src/user/entities/user-address.entity";
import { UserAcademic } from "src/user/entities/user-academic.entity";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserContact } from "src/user/entities/user-contact.entity";
export declare class UserService {
    private userInfoRepository;
    private userContactRepository;
    private userAddressRepository;
    private userAcademicRepository;
    constructor(userInfoRepository: Repository<UserInfo>, userContactRepository: Repository<UserContact>, userAddressRepository: Repository<UserAddress>, userAcademicRepository: Repository<UserAcademic>);
    private checkDuplicateContact;
    create(createUserDto: CreateUserDto): Promise<UserInfo>;
    findAll(): Promise<UserInfo[]>;
    findOne(id: number): Promise<UserInfo>;
    update(id: number, updateUserDto: CreateUserDto): Promise<UserInfo>;
    remove(id: number): Promise<void>;
}
