"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockCompleteUserInfo = exports.mockUserInfo = exports.mockUserContact = exports.mockUserAddress = exports.mockUserAcademic = void 0;
exports.mockUserAcademic = {
    id: 1,
    schoolName: "Harvard University",
    degree: "Computer Science",
    graduationYear: 2020,
    description: "Graduated with honors",
    userInfo: undefined,
};
exports.mockUserAddress = {
    id: 1,
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    country: "USA",
    zipCode: "10001",
    userInfo: undefined,
};
exports.mockUserContact = {
    id: 1,
    email: "john.doe@example.com",
    phoneNumber: "+1234567890",
    fax: "123-456-7890",
    linkedInUrl: "https://linkedin.com/in/johndoe",
    userInfo: undefined,
};
exports.mockUserInfo = {
    id: 1,
    profilePhoto: "https://example.com/photo.jpg",
    firstName: "John",
    lastName: "Doe",
    dob: new Date("1990-01-01"),
    occupation: "Software Engineer",
    gender: "Male",
    contact: exports.mockUserContact,
    address: exports.mockUserAddress,
    academics: [exports.mockUserAcademic],
};
exports.mockCompleteUserInfo = Object.assign(Object.assign({}, exports.mockUserInfo), { contact: Object.assign(Object.assign({}, exports.mockUserContact), { userInfo: exports.mockUserInfo }), address: Object.assign(Object.assign({}, exports.mockUserAddress), { userInfo: exports.mockUserInfo }), academics: [
        Object.assign(Object.assign({}, exports.mockUserAcademic), { userInfo: exports.mockUserInfo }),
    ] });
//# sourceMappingURL=user-entity.fixture.js.map