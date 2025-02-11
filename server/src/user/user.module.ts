// src/user/user.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserInfo } from './entities/user-info.entity';
import { UserContact } from './entities/user-contact.entity';
import { UserAddress } from './entities/user-address.entity';
import { UserAcademic } from './entities/user-academic.entity';
import { UserService } from './services/user/user.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserInfo,
      UserContact,
      UserAddress,
      UserAcademic
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}