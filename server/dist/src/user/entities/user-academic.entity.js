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
exports.UserAcademic = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_info_entity_1 = require("./user-info.entity");
let UserAcademic = class UserAcademic {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, schoolName: { required: true, type: () => String }, degree: { required: true, type: () => String }, graduationYear: { required: true, type: () => Number }, description: { required: true, type: () => String }, userInfo: { required: true, type: () => require("./user-info.entity").UserInfo } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserAcademic.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserAcademic.prototype, "schoolName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserAcademic.prototype, "degree", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserAcademic.prototype, "graduationYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserAcademic.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_info_entity_1.UserInfo, (userInfo) => userInfo.academics, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_info_entity_1.UserInfo)
], UserAcademic.prototype, "userInfo", void 0);
UserAcademic = __decorate([
    (0, typeorm_1.Entity)("UserAcademicsTB")
], UserAcademic);
exports.UserAcademic = UserAcademic;
//# sourceMappingURL=user-academic.entity.js.map