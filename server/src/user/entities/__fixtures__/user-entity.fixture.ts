import { UserAcademic } from "../user-academic.entity";
import { UserAddress } from "../user-address.entity";
import { UserContact } from "../user-contact.entity";
import { UserInfo } from "../user-info.entity";

export const mockUserAcademic: Partial<UserAcademic> = {
  id: 1,
  schoolName: "Harvard University",
  degree: "Computer Science",
  graduationYear: 2020,
  description: "Graduated with honors",
  userInfo: undefined,
};

export const mockUserAddress: Partial<UserAddress> = {
  id: 1,
  address: "123 Main Street",
  city: "New York",
  state: "NY",
  country: "USA",
  zipCode: "10001",
  userInfo: undefined,
};

export const mockUserContact: Partial<UserContact> = {
  id: 1,
  email: "john.doe@example.com",
  phoneNumber: "+1234567890",
  fax: "123-456-7890",
  linkedInUrl: "https://linkedin.com/in/johndoe",
  userInfo: undefined,
};

export const mockUserInfo: Partial<UserInfo> = {
  id: 1,
  profilePhoto: "https://example.com/photo.jpg",
  firstName: "John",
  lastName: "Doe",
  dob: new Date("1990-01-01"),
  occupation: "Software Engineer",
  gender: "Male",
  contact: mockUserContact as UserContact,
  address: mockUserAddress as UserAddress,
  academics: [mockUserAcademic as UserAcademic],
};

export const mockCompleteUserInfo: Partial<UserInfo> = {
  ...mockUserInfo,
  contact: {
    ...mockUserContact,
    userInfo: mockUserInfo as UserInfo,
  } as UserContact,
  address: {
    ...mockUserAddress,
    userInfo: mockUserInfo as UserInfo,
  } as UserAddress,
  academics: [
    {
      ...mockUserAcademic,
      userInfo: mockUserInfo as UserInfo,
    } as UserAcademic,
  ],
};
