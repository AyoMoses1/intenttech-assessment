// src/user/user.module.ts

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserService } from "./services/user/user.service";
import { UserInfo } from "./entities/user-info.entity";
import { UserContact } from "./entities/user-contact.entity";
import { UserAddress } from "./entities/user-address.entity";
import { UserAcademic } from "./entities/user-academic.entity";
import { CloudinaryService } from "src/services/cloudinary/cloudinary.service";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserInfo,
      UserContact,
      UserAddress,
      UserAcademic,
    ]),
    ConfigModule,
  ],
  controllers: [UserController],
  providers: [UserService, CloudinaryService],
})
export class UserModule {}
