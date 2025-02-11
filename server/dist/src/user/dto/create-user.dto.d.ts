import { CreateUserContactDto } from "./create-user-contact.dto";
import { CreateUserAddressDto } from "./create-user-address.dto";
import { CreateUserAcademicDto } from "./create-user-academic.dto";
export declare class CreateUserDto {
    profilePhoto?: string;
    firstName: string;
    lastName: string;
    dob: Date;
    occupation: string;
    gender: string;
    contact: CreateUserContactDto;
    address: CreateUserAddressDto;
    academics: CreateUserAcademicDto[];
}
