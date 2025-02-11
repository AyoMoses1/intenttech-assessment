import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { CreateUserContactDto } from "./create-user-contact.dto";
import { CreateUserAddressDto } from "./create-user-address.dto";
import { CreateUserAcademicDto } from "./create-user-academic.dto";

export class CreateUserDto {
  @IsString()
  @IsOptional()
  profilePhoto?: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDateString()
  @IsNotEmpty()
  dob: Date;

  @IsString()
  @IsNotEmpty()
  occupation: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @ValidateNested()
  @Type(() => CreateUserContactDto)
  @IsNotEmpty()
  contact: CreateUserContactDto;

  @ValidateNested()
  @Type(() => CreateUserAddressDto)
  @IsNotEmpty()
  address: CreateUserAddressDto;

  @ValidateNested({ each: true })
  @Type(() => CreateUserAcademicDto)
  @IsArray()
  @IsNotEmpty()
  academics: CreateUserAcademicDto[];
}
