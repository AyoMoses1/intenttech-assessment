import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

// src/user/dto/create-user-academic.dto.ts
export class CreateUserAcademicDto {
  @IsString()
  @IsNotEmpty()
  schoolName: string;

  @IsString()
  @IsNotEmpty()
  degree: string;

  @IsNumber()
  @IsNotEmpty()
  graduationYear: number;

  @IsString()
  @IsOptional()
  description?: string;
}
