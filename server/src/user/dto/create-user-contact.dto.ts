import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

// src/user/dto/create-user-contact.dto.ts
export class CreateUserContactDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  fax?: string;

  @IsString()
  @IsOptional()
  linkedInUrl?: string;
}
