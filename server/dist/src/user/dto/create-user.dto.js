"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_user_contact_dto_1 = require("./create-user-contact.dto");
const create_user_address_dto_1 = require("./create-user-address.dto");
const create_user_academic_dto_1 = require("./create-user-academic.dto");
class CreateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { profilePhoto: { required: false, type: () => String }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, dob: { required: true, type: () => Date }, occupation: { required: true, type: () => String }, gender: { required: true, type: () => String }, contact: { required: true, type: () => require("./create-user-contact.dto").CreateUserContactDto }, address: { required: true, type: () => require("./create-user-address.dto").CreateUserAddressDto }, academics: { required: true, type: () => [require("./create-user-academic.dto").CreateUserAcademicDto] } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "profilePhoto", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], CreateUserDto.prototype, "dob", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "occupation", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_user_contact_dto_1.CreateUserContactDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", create_user_contact_dto_1.CreateUserContactDto)
], CreateUserDto.prototype, "contact", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_user_address_dto_1.CreateUserAddressDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", create_user_address_dto_1.CreateUserAddressDto)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_user_academic_dto_1.CreateUserAcademicDto),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "academics", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map