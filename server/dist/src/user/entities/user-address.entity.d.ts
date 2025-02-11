import { UserInfo } from "./user-info.entity";
export declare class UserAddress {
    id: number;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    userInfo: UserInfo;
}
