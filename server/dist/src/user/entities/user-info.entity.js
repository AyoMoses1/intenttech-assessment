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
exports.UserInfo = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_contact_entity_1 = require("./user-contact.entity");
const user_address_entity_1 = require("./user-address.entity");
const user_academic_entity_1 = require("./user-academic.entity");
let UserInfo = class UserInfo {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, profilePhoto: { required: true, type: () => String }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, dob: { required: true, type: () => Date }, occupation: { required: true, type: () => String }, gender: { required: true, type: () => String }, contact: { required: true, type: () => require("./user-contact.entity").UserContact }, address: { required: true, type: () => require("./user-address.entity").UserAddress }, academics: { required: true, type: () => [require("./user-academic.entity").UserAcademic] } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserInfo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], UserInfo.prototype, "profilePhoto", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserInfo.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserInfo.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], UserInfo.prototype, "dob", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserInfo.prototype, "occupation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserInfo.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_contact_entity_1.UserContact, (contact) => contact.userInfo, {
        cascade: true,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", user_contact_entity_1.UserContact)
], UserInfo.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_address_entity_1.UserAddress, (address) => address.userInfo, {
        cascade: true,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", user_address_entity_1.UserAddress)
], UserInfo.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_academic_entity_1.UserAcademic, (academic) => academic.userInfo, {
        cascade: true,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], UserInfo.prototype, "academics", void 0);
UserInfo = __decorate([
    (0, typeorm_1.Entity)("UserInfoTB")
], UserInfo);
exports.UserInfo = UserInfo;
//# sourceMappingURL=user-info.entity.js.map