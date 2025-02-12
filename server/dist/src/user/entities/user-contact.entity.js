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
exports.UserContact = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_info_entity_1 = require("./user-info.entity");
let UserContact = class UserContact {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, email: { required: true, type: () => String }, phoneNumber: { required: true, type: () => String }, fax: { required: true, type: () => String }, linkedInUrl: { required: true, type: () => String }, userInfo: { required: true, type: () => require("./user-info.entity").UserInfo } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserContact.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserContact.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserContact.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserContact.prototype, "fax", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserContact.prototype, "linkedInUrl", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_info_entity_1.UserInfo, (userInfo) => userInfo.contact, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_info_entity_1.UserInfo)
], UserContact.prototype, "userInfo", void 0);
UserContact = __decorate([
    (0, typeorm_1.Entity)("UserContactTB")
], UserContact);
exports.UserContact = UserContact;
//# sourceMappingURL=user-contact.entity.js.map