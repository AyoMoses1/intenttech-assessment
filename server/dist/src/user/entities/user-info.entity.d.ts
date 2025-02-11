import { UserContact } from "./user-contact.entity";
import { UserAddress } from "./user-address.entity";
import { UserAcademic } from "./user-academic.entity";
export declare class UserInfo {
    id: number;
    profilePhoto: string;
    firstName: string;
    lastName: string;
    dob: Date;
    occupation: string;
    gender: string;
    contact: UserContact;
    address: UserAddress;
    academics: UserAcademic[];
}
