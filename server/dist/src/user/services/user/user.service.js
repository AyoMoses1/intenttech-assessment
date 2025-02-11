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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_info_entity_1 = require("../../entities/user-info.entity");
const user_address_entity_1 = require("../../entities/user-address.entity");
const user_academic_entity_1 = require("../../entities/user-academic.entity");
const user_contact_entity_1 = require("../../entities/user-contact.entity");
let UserService = class UserService {
    constructor(userInfoRepository, userContactRepository, userAddressRepository, userAcademicRepository) {
        this.userInfoRepository = userInfoRepository;
        this.userContactRepository = userContactRepository;
        this.userAddressRepository = userAddressRepository;
        this.userAcademicRepository = userAcademicRepository;
    }
    async checkDuplicateContact(email, phoneNumber, excludeUserId) {
        const whereClause = [{ email }, { phoneNumber }];
        if (excludeUserId) {
            whereClause.forEach((clause) => {
                clause.userInfo = { id: (0, typeorm_2.Not)(excludeUserId) };
            });
        }
        const existingContact = await this.userContactRepository.findOne({
            where: whereClause,
            relations: ["userInfo"],
        });
        if (existingContact) {
            if (existingContact.email === email) {
                throw new common_1.ConflictException(`User with email ${email} already exists`);
            }
            if (existingContact.phoneNumber === phoneNumber) {
                throw new common_1.ConflictException(`User with phone number ${phoneNumber} already exists`);
            }
        }
    }
    async create(createUserDto) {
        await this.checkDuplicateContact(createUserDto.contact.email, createUserDto.contact.phoneNumber);
        const userInfo = this.userInfoRepository.create({
            profilePhoto: createUserDto.profilePhoto,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            dob: createUserDto.dob,
            occupation: createUserDto.occupation,
            gender: createUserDto.gender,
        });
        const savedUserInfo = await this.userInfoRepository.save(userInfo);
        const userContact = this.userContactRepository.create(Object.assign(Object.assign({}, createUserDto.contact), { userInfo: savedUserInfo }));
        await this.userContactRepository.save(userContact);
        const userAddress = this.userAddressRepository.create(Object.assign(Object.assign({}, createUserDto.address), { userInfo: savedUserInfo }));
        await this.userAddressRepository.save(userAddress);
        const academics = createUserDto.academics.map((academic) => this.userAcademicRepository.create(Object.assign(Object.assign({}, academic), { userInfo: savedUserInfo })));
        await this.userAcademicRepository.save(academics);
        return this.findOne(savedUserInfo.id);
    }
    async findAll() {
        return await this.userInfoRepository.find({
            relations: ["contact", "address", "academics"],
        });
    }
    async findOne(id) {
        const user = await this.userInfoRepository.findOne({
            where: { id },
            relations: ["contact", "address", "academics"],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async update(id, updateUserDto) {
        const existingUser = await this.findOne(id);
        await this.userInfoRepository.update(id, {
            profilePhoto: updateUserDto.profilePhoto,
            firstName: updateUserDto.firstName,
            lastName: updateUserDto.lastName,
            dob: updateUserDto.dob,
            occupation: updateUserDto.occupation,
            gender: updateUserDto.gender,
        });
        await this.userContactRepository.update({ userInfo: { id } }, updateUserDto.contact);
        await this.userAddressRepository.update({ userInfo: { id } }, updateUserDto.address);
        await this.userAcademicRepository.delete({ userInfo: { id } });
        const academics = updateUserDto.academics.map((academic) => this.userAcademicRepository.create(Object.assign(Object.assign({}, academic), { userInfo: { id } })));
        await this.userAcademicRepository.save(academics);
        return this.findOne(id);
    }
    async remove(id) {
        const user = await this.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        await this.userInfoRepository.remove(user);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_info_entity_1.UserInfo)),
    __param(1, (0, typeorm_1.InjectRepository)(user_contact_entity_1.UserContact)),
    __param(2, (0, typeorm_1.InjectRepository)(user_address_entity_1.UserAddress)),
    __param(3, (0, typeorm_1.InjectRepository)(user_academic_entity_1.UserAcademic)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map