// src/user/user.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./services/user/user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: CreateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  // src/user/user.controller.ts
  @Delete(":id")
  remove(@Param("id") id: string): Promise<{ message: string }> {
    return this.userService.remove(+id);
  }
}
