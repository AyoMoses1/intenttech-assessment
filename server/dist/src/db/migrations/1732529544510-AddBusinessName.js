"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddBusinessName1732529544510 = void 0;
class AddBusinessName1732529544510 {
    constructor() {
        this.name = 'AddBusinessName1732529544510';
    }
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "first_name" character varying NOT NULL,
                "last_name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "business_name" character varying NOT NULL,
                "password" character varying NOT NULL,
                "token" character varying NOT NULL,
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "users"
        `);
    }
}
exports.AddBusinessName1732529544510 = AddBusinessName1732529544510;
//# sourceMappingURL=1732529544510-AddBusinessName.js.map