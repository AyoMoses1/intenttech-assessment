// src/types/user.types.ts

export interface UserAcademic {
  id?: number;
  schoolName: string;
  degree: string;
  graduationYear: number;
  description?: string;
}

export interface UserAddress {
  id?: number;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface UserContact {
  id?: number;
  email: string;
  phoneNumber: string;
  fax?: string;
  linkedInUrl?: string;
}

export interface UserInfo {
  id: number;
  profilePhoto?: string | File;
  firstName: string;
  lastName: string;
  dob: string;
  occupation: string;
  gender: string;
  contact: UserContact;
  address: UserAddress;
  academics: UserAcademic[];
}

export type CreateUserDto = Omit<UserInfo, "id">;
export type UpdateUserDto = Partial<CreateUserDto>;
