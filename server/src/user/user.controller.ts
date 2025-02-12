import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  HttpException,
  HttpStatus,
  ValidationPipe,
  UsePipes,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./services/user/user.service";
import { UserInfo } from "./entities/user-info.entity";
import { CloudinaryService } from "src/services/cloudinary/cloudinary.service";

@Controller("users")
@UsePipes(ValidationPipe)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: "profilePhoto", maxCount: 1 }])
  )
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFiles()
    files?: {
      profilePhoto?: Express.Multer.File[];
    }
  ): Promise<{ message: string; user: UserInfo }> {
    try {
      let profilePhotoUrl = "";

      // Handle file upload if present
      if (files?.profilePhoto?.[0]) {
        const uploadResult = await this.cloudinaryService.uploadDocument(
          files.profilePhoto[0]
        );
        profilePhotoUrl = uploadResult.secure_url;
      } 
      // Handle base64 string if present
      else if (createUserDto.profilePhoto && createUserDto.profilePhoto.startsWith('data:image')) {
        const uploadResult = await this.cloudinaryService.uploadBase64(
          createUserDto.profilePhoto
        );
        profilePhotoUrl = uploadResult.secure_url;
      }

      const user = await this.userService.create({
        ...createUserDto,
        profilePhoto: profilePhotoUrl,
      });

      return {
        message: "User created successfully",
        user,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          message: "Failed to create user",
          errors: [error.message],
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async findAll(): Promise<{ message: string; users: UserInfo[] }> {
    try {
      const users = await this.userService.findAll();
      return {
        message: "Users retrieved successfully",
        users,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: "Failed to fetch users",
          errors: [error.message],
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":id")
  async findOne(
    @Param("id") id: string
  ): Promise<{ message: string; user: UserInfo }> {
    try {
      const user = await this.userService.findOne(+id);
      return {
        message: "User retrieved successfully",
        user,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          message: "Failed to fetch user",
          errors: [error.message],
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(":id")
  @UseInterceptors(
    FileFieldsInterceptor([{ name: "profilePhoto", maxCount: 1 }])
  )
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: CreateUserDto,
    @UploadedFiles()
    files?: {
      profilePhoto?: Express.Multer.File[];
    }
  ): Promise<{ message: string; user: UserInfo }> {
    try {
      let profilePhotoUrl = updateUserDto.profilePhoto;

      // Handle file upload if present
      if (files?.profilePhoto?.[0]) {
        const uploadResult = await this.cloudinaryService.uploadDocument(
          files.profilePhoto[0]
        );
        profilePhotoUrl = uploadResult.secure_url;
      } 
      // Handle base64 string if it's changed
      else if (updateUserDto.profilePhoto?.startsWith('data:image')) {
        const uploadResult = await this.cloudinaryService.uploadBase64(
          updateUserDto.profilePhoto
        );
        profilePhotoUrl = uploadResult.secure_url;
      }

      const user = await this.userService.update(+id, {
        ...updateUserDto,
        profilePhoto: profilePhotoUrl,
      });

      return {
        message: "User updated successfully",
        user,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          message: "Failed to update user",
          errors: [error.message],
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<{ message: string }> {
    try {
      return await this.userService.remove(+id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          message: "Failed to delete user",
          errors: [error.message],
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}