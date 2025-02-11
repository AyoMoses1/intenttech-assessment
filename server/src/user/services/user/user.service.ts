// src/user/user.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserInfo } from "src/user/entities/user-info.entity";
import { UserAddress } from "src/user/entities/user-address.entity";
import { UserAcademic } from "src/user/entities/user-academic.entity";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserContact } from "src/user/entities/user-contact.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,
    @InjectRepository(UserContact)
    private userContactRepository: Repository<UserContact>,
    @InjectRepository(UserAddress)
    private userAddressRepository: Repository<UserAddress>,
    @InjectRepository(UserAcademic)
    private userAcademicRepository: Repository<UserAcademic>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserInfo> {
    // Create UserInfo instance
    const userInfo = this.userInfoRepository.create({
      profilePhoto: createUserDto.profilePhoto,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      dob: createUserDto.dob,
      occupation: createUserDto.occupation,
      gender: createUserDto.gender,
    });

    // Save UserInfo first to get the ID
    const savedUserInfo = await this.userInfoRepository.save(userInfo);

    // Create and save UserContact
    const userContact = this.userContactRepository.create({
      ...createUserDto.contact,
      userInfo: savedUserInfo,
    });
    await this.userContactRepository.save(userContact);

    // Create and save UserAddress
    const userAddress = this.userAddressRepository.create({
      ...createUserDto.address,
      userInfo: savedUserInfo,
    });
    await this.userAddressRepository.save(userAddress);

    // Create and save UserAcademics
    const academics = createUserDto.academics.map((academic) =>
      this.userAcademicRepository.create({
        ...academic,
        userInfo: savedUserInfo,
      })
    );
    await this.userAcademicRepository.save(academics);

    // Return complete user info with all relations
    return this.findOne(savedUserInfo.id);
  }

  async findAll(): Promise<UserInfo[]> {
    return await this.userInfoRepository.find({
      relations: ["contact", "address", "academics"],
    });
  }

  async findOne(id: number): Promise<UserInfo> {
    const user = await this.userInfoRepository.findOne({
      where: { id },
      relations: ["contact", "address", "academics"],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: CreateUserDto): Promise<UserInfo> {
    const existingUser = await this.findOne(id);

    // Update UserInfo
    await this.userInfoRepository.update(id, {
      profilePhoto: updateUserDto.profilePhoto,
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      dob: updateUserDto.dob,
      occupation: updateUserDto.occupation,
      gender: updateUserDto.gender,
    });

    // Update UserContact
    await this.userContactRepository.update(
      { userInfo: { id } },
      updateUserDto.contact
    );

    // Update UserAddress
    await this.userAddressRepository.update(
      { userInfo: { id } },
      updateUserDto.address
    );

    // Update UserAcademics
    // First remove existing academics
    await this.userAcademicRepository.delete({ userInfo: { id } });

    // Then create new ones
    const academics = updateUserDto.academics.map((academic) =>
      this.userAcademicRepository.create({
        ...academic,
        userInfo: { id },
      })
    );
    await this.userAcademicRepository.save(academics);

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Due to cascade, this will remove related records in other tables
    await this.userInfoRepository.remove(user);
  }
}
