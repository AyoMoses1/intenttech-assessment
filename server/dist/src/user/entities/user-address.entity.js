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
exports.UserAddress = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_info_entity_1 = require("./user-info.entity");
let UserAddress = class UserAddress {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, address: { required: true, type: () => String }, city: { required: true, type: () => String }, state: { required: true, type: () => String }, country: { required: true, type: () => String }, zipCode: { required: true, type: () => String }, userInfo: { required: true, type: () => require("./user-info.entity").UserInfo } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserAddress.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserAddress.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserAddress.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserAddress.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserAddress.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserAddress.prototype, "zipCode", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_info_entity_1.UserInfo),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_info_entity_1.UserInfo)
], UserAddress.prototype, "userInfo", void 0);
UserAddress = __decorate([
    (0, typeorm_1.Entity)("UserAddressTB")
], UserAddress);
exports.UserAddress = UserAddress;
//# sourceMappingURL=user-address.entity.js.map